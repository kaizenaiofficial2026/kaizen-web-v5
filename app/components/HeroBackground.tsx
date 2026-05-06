"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ROBOT_URL = "/models/friendly_robot.glb";
useGLTF.preload(ROBOT_URL);

const ROBOT_DESKTOP_POSITION: [number, number, number] = [1.45, -0.18, 0];
const ROBOT_MOBILE_POSITION: [number, number, number] = [0.55, -0.73, 0];

const lattice = {
  vertex: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragment: /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Wireframe-box SDF (Inigo Quilez)
    float sdBoxFrame(vec3 p, vec3 b, float e) {
      p = abs(p) - b;
      vec3 q = abs(p + e) - e;
      return min(min(
        length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
        length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)),
        length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0));
    }

    float map(vec3 p) {
      // gentle warp so it doesn't feel rigid
      p.xy += 0.15 * vec2(sin(p.z * 0.4 + uTime * 0.2), cos(p.z * 0.3 + uTime * 0.15));
      vec3 q = mod(p + 1.5, 3.0) - 1.5;
      return sdBoxFrame(q, vec3(1.0), 0.015);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
      vec3 ro = vec3(0.0, 0.0, uTime * 0.45);
      vec3 rd = normalize(vec3(uv, 1.2));

      // slow camera tilt
      float a = uTime * 0.05;
      mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
      rd.xy = rot * rd.xy;

      float t = 0.0;
      float glow = 0.0;
      for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        // edge glow accumulation
        glow += 0.012 / (0.02 + d * d);
        if (d < 0.001 || t > 30.0) break;
        t += max(d, 0.01);
      }

      // distance fog
      float fog = exp(-t * 0.08);
      vec3 colA = vec3(0.55, 0.7, 1.0);   // cool cyan
      vec3 colB = vec3(0.95, 0.55, 0.25); // warm amber
      vec3 col = mix(colB, colA, smoothstep(0.0, 1.0, glow * 0.05));
      col *= glow * 0.06 * fog;

      // subtle radial darkening to keep edges quiet
      float vig = smoothstep(1.4, 0.2, length(uv));
      col *= mix(0.4, 1.0, vig);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

function LatticeBackdrop() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    const material = ref.current;
    if (!material) return;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    const { width, height } = state.size;
    const dpr = state.viewport.dpr;
    material.uniforms.uResolution.value.set(width * dpr, height * dpr);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1000}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={lattice.vertex}
        fragmentShader={lattice.fragment}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function Robot() {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const headRest = useRef<{ x: number; y: number; z: number } | null>(null);

  const { scene } = useGLTF(ROBOT_URL);
  const { viewport } = useThree();
  const isNarrow = viewport.width < 4;
  const robotPosition = isNarrow ? ROBOT_MOBILE_POSITION : ROBOT_DESKTOP_POSITION;
  const robotScale = isNarrow ? 0.34 : 0.72;

  // Clone so HMR / multiple mounts don't share the same object graph.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const head = cloned.getObjectByName("cabeza");
    if (head) {
      headRef.current = head;
      headRest.current = {
        x: head.rotation.x,
        y: head.rotation.y,
        z: head.rotation.z,
      };
    }
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
  }, [cloned]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Idle float + slow turn for the whole robot
    if (group.current) {
      group.current.position.y = robotPosition[1] + Math.sin(t * 1.2) * 0.04;
      group.current.rotation.y = -0.35 + Math.sin(t * 0.4) * 0.08;
    }

    if (headRef.current && headRest.current) {
      const headTilt = headRest.current.z + Math.sin(t * 1.5) * 0.04;
      const headNod = headRest.current.x + Math.sin(t * 1.1) * 0.03;

      headRef.current.rotation.z = THREE.MathUtils.damp(
        headRef.current.rotation.z,
        headTilt,
        6,
        delta
      );
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        headNod,
        6,
        delta
      );
    }
  });

  return (
    <group
      ref={group}
      position={robotPosition}
      scale={robotScale}
      rotation={[0, -0.35, 0]}
    >
      <primitive object={cloned} />
    </group>
  );
}

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#05060a"]} />

        {/* Backdrop renders first, ignores depth */}
        <LatticeBackdrop />

        {/* Foreground geometry */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} color="#ffd9b0" />
        <directionalLight position={[-3, -1, 2]} intensity={0.7} color="#88aaff" />
        <Suspense fallback={null}>
          <Robot />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0008, 0.0012]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
