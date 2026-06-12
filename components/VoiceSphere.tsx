"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Effects, OrbitControls } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

extend({ UnrealBloomPass });

type ParticleSwarmProps = {
  isActive: boolean;
  amplitude: number;
  speaking: boolean;
  bloomRef: React.RefObject<UnrealBloomPass | null>;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: {
      ref?: React.Ref<UnrealBloomPass>;
      threshold?: number;
      strength?: number;
      radius?: number;
    };
  }
}

const IDLE_COLOR = new THREE.Color(0xf0ead8); // cream / off-white
const GOLD_COLOR = new THREE.Color(0.85, 0.65, 0.15); // warm gold when speaking

const ParticleSwarm = ({
  isActive,
  amplitude,
  speaking,
  bloomRef,
}: ParticleSwarmProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const expansionRef = useRef(1);
  const ampRef = useRef(0);
  const colorMixRef = useRef(0);
  const count = 5000;
  const speedMult = isActive ? 1.2 : 0.15;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos = [];
    const seededRandom = (index: number, axis: number) => {
      const value = Math.sin(index * 12.9898 + axis * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (seededRandom(i, 0) - 0.5) * 100,
          (seededRandom(i, 1) - 0.5) * 100,
          (seededRandom(i, 2) - 0.5) * 100,
        ),
      );
    }
    return pos;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xf0ead8,
      }),
    [],
  );
  const geometry = useMemo(
    () => new THREE.ConeGeometry(0.1, 0.5, 4).rotateX(Math.PI / 2),
    [],
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    // Smooth the live voice amplitude (0–1) so the sphere pulses instead of jitters.
    const targetAmp = isActive ? Math.min(1, Math.max(0, amplitude)) : 0;
    ampRef.current += (targetAmp - ampRef.current) * 0.18;
    const amp = ampRef.current;

    // Drive the sphere radius from the voice. A small idle breathe keeps it alive
    // while listening; the voice pushes it outward as the assistant speaks.
    const idleBreathe = isActive
      ? 1.02 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.015
      : 1.0;
    const targetExpansion = idleBreathe + amp * 0.55;
    expansionRef.current += (targetExpansion - expansionRef.current) * 0.12;

    // Tint toward gold while the assistant is speaking, back to cream otherwise.
    const targetMix = speaking ? 1 : 0;
    colorMixRef.current += (targetMix - colorMixRef.current) * 0.1;
    pColor.copy(IDLE_COLOR).lerp(GOLD_COLOR, colorMixRef.current);

    for (let i = 0; i < count; i++) {
      const r = 30;
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi + time;
      const expandedR = r * expansionRef.current;
      target.set(
        expandedR * Math.cos(theta) * Math.sin(phi),
        expandedR * Math.sin(theta) * Math.sin(phi),
        expandedR * Math.cos(phi),
      );

      const lerpSpeed = isActive ? 0.04 : 0.08;
      positions[i].lerp(target, lerpSpeed);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Bloom reacts to the voice too — brighter glow as the assistant speaks.
    if (bloomRef.current) {
      bloomRef.current.strength = (isActive ? 1.2 : 1.0) + amp * 1.6;
      bloomRef.current.radius = isActive ? 0.5 : 0.3;
    }
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

export default function VoiceSphere({
  isActive = false,
  amplitude = 0,
  speaking = false,
}: {
  isActive?: boolean;
  amplitude?: number;
  speaking?: boolean;
}) {
  const bloomRef = useRef<UnrealBloomPass | null>(null);

  return (
    <div style={{ width: "100%", height: "100%", background: "transparent" }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={["#000000", 0.008]} />
        <ParticleSwarm
          isActive={isActive}
          amplitude={amplitude}
          speaking={speaking}
          bloomRef={bloomRef}
        />
        <OrbitControls autoRotate enableZoom={false} enablePan={false} />
        <Effects disableGamma>
          <unrealBloomPass
            ref={bloomRef}
            threshold={0}
            strength={1.0}
            radius={0.3}
          />
        </Effects>
      </Canvas>
    </div>
  );
}
