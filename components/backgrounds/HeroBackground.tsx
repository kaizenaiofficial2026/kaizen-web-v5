"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const shaderAnimation = {
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
    uniform vec2 uMouse;
    varying vec2 vUv;

    float ringLayer(vec2 uv, float time, float channelOffset) {
      float layer = 0.0;
      float lineWidth = 0.0027;

      for (int ring = 0; ring < 5; ring++) {
        float ringOffset = float(ring) * 0.07;
        float radius = fract(time - channelOffset + ringOffset) * 1.55;
        float lattice = mod(uv.x + uv.y, 0.2) * 0.38;
        float distanceField = abs(radius - length(uv * vec2(1.0, 0.9)) + lattice);
        layer += lineWidth * float(ring * ring) / max(distanceField, 0.006);
      }

      return layer;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
      vec2 m = uMouse * 2.0 - 1.0;
      uv += vec2(m.x * 0.08, m.y * 0.05);

      float time = uTime * 0.18;
      vec3 rings = vec3(
        ringLayer(uv, time, 0.0),
        ringLayer(uv, time, 0.012),
        ringLayer(uv, time, 0.024)
      );

      vec3 bg = vec3(0.039, 0.035, 0.027);
      vec3 gold = vec3(0.79, 0.63, 0.24);
      vec3 ember = vec3(0.93, 0.74, 0.27);
      vec3 teal = vec3(0.23, 0.79, 0.72);

      vec3 color = rings.r * gold + rings.g * ember + rings.b * teal * 0.6;
      color *= 0.72;

      float vignette = smoothstep(1.35, 0.18, length(uv));
      color *= vignette;
      color += bg;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function ShaderField() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const material = ref.current;
    if (!material) return;

    material.uniforms.uTime.value = state.clock.elapsedTime;

    const { width, height } = state.size;
    const dpr = state.viewport.dpr;
    material.uniforms.uResolution.value.set(width * dpr, height * dpr);

    const m = material.uniforms.uMouse.value as THREE.Vector2;
    m.lerp(targetMouse.current, 0.05);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1000}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={shaderAnimation.vertex}
        fragmentShader={shaderAnimation.fragment}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0907"]} />

        <ShaderField />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.6}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0006, 0.0009]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
