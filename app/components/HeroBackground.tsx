"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const waveShader = {
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

    #define LINE_COUNT 70

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

      // soft pull toward cursor
      vec2 m = uMouse * 2.0 - 1.0;
      m.x *= uResolution.x / uResolution.y;

      vec3 col = vec3(0.0);

      for (int i = 0; i < LINE_COUNT; i++) {
        float fi = float(i);
        float t = fi / float(LINE_COUNT);

        // line spread vertically, packed denser in the center
        float baseY = (t - 0.5) * 0.85;

        // amplitude envelope — wave is taller in the middle, flat at edges
        float env = 1.0 - pow(abs(t - 0.5) * 2.0, 1.5);
        env = max(env, 0.0);
        float amp = 0.16 * env;

        // per-line phase, plus mouse influence
        float phase = uTime * 0.35 + fi * 0.055 + m.x * 0.6;
        float mouseLift = m.y * 0.08 * env;

        // layered sines for organic wave
        float wave =
            sin(uv.x * 2.2 + phase) * amp
          + sin(uv.x * 4.7 - phase * 1.3) * amp * 0.32
          + sin(uv.x * 9.0 + phase * 0.7) * amp * 0.12;

        float y = baseY + wave + mouseLift;

        // distance from this pixel to the line
        float d = abs(uv.y - y);

        // anti-aliased thin line
        float line = smoothstep(0.0035, 0.0, d);

        // gold gradient — deep → main → light along x with subtle drift
        float gx = smoothstep(-0.9, 0.9, uv.x + sin(uTime * 0.2 + fi * 0.1) * 0.1);
        vec3 goldDeep  = vec3(0.55, 0.43, 0.14);
        vec3 goldMain  = vec3(0.79, 0.63, 0.24);
        vec3 goldLight = vec3(0.93, 0.83, 0.47);
        vec3 lineCol = mix(goldDeep, goldMain, smoothstep(0.0, 0.55, gx));
        lineCol = mix(lineCol, goldLight, smoothstep(0.55, 1.0, gx));

        col += line * lineCol * 0.55;
      }

      // gentle radial fade so edges stay quiet
      float vig = smoothstep(1.3, 0.25, length(uv));
      col *= mix(0.45, 1.0, vig);

      // primary-black base showing through
      vec3 bg = vec3(0.039, 0.035, 0.027);
      col += bg;

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

function WaveField() {
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
        vertexShader={waveShader.vertex}
        fragmentShader={waveShader.fragment}
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
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0907"]} />

        <WaveField />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.5}
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
