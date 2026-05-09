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

    float bandLayer(vec2 uv, float time, float channelOffset) {
      float layer = 0.0;

      for (int band = 0; band < 7; band++) {
        float fi = float(band);
        float angle = 0.58 + fi * 0.18;
        vec2 direction = normalize(vec2(cos(angle), sin(angle)));
        vec2 crossDirection = vec2(-direction.y, direction.x);

        float sweep = fract(time + channelOffset + fi * 0.075) * 4.2 - 2.1;
        float bend =
          sin(dot(uv, crossDirection) * 2.9 + time * 2.2 + fi) * 0.12
          + mod(uv.x + uv.y + fi * 0.04, 0.22) * 0.42;
        float field = dot(uv, direction) + bend;
        float distanceField = abs(sweep - field);

        layer += 0.0036 * (fi + 1.0) / max(distanceField, 0.01);
      }

      return layer;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
      vec2 m = uMouse * 2.0 - 1.0;
      uv += vec2(m.x * 0.08, m.y * 0.05);

      float time = uTime * 0.22;
      vec3 bands = vec3(
        bandLayer(uv, time, 0.0),
        bandLayer(uv, time, 0.016),
        bandLayer(uv, time, 0.032)
      );

      vec3 bg = vec3(0.039, 0.035, 0.027);
      vec3 gold = vec3(1.0, 0.72, 0.12);
      vec3 ember = vec3(1.0, 0.44, 0.10);
      vec3 teal = vec3(0.12, 0.98, 0.88);

      vec3 color = bands.r * gold + bands.g * ember * 0.72 + bands.b * teal * 0.72;
      color *= 0.92;

      vec2 frameUv = abs((gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0);
      float edgeFade = smoothstep(1.08, 0.34, max(frameUv.x, frameUv.y));
      color *= mix(0.55, 1.0, edgeFade);
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
            intensity={0.58}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0006, 0.0009]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.22} darkness={0.58} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
