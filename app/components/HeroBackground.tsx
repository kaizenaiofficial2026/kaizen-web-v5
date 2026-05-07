"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#05060a"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} color="#ffd9b0" />
        <directionalLight position={[-3, -1, 2]} intensity={0.7} color="#88aaff" />

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
