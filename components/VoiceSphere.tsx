"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Effects, OrbitControls } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

extend({ UnrealBloomPass });

type ParticleSwarmProps = {
  isActive: boolean;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: {
      threshold?: number;
      strength?: number;
      radius?: number;
    };
  }
}

const ParticleSwarm = ({ isActive }: ParticleSwarmProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const expansionRef = useRef(1);
  const expansionDirectionRef = useRef(1);
  const count = 5000;
  const speedMult = isActive ? 1.2 : 0.15;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor;

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

    if (isActive) {
      expansionRef.current += 0.004 * expansionDirectionRef.current;
      if (expansionRef.current > 1.15) {
        expansionDirectionRef.current = -1;
      }
      if (expansionRef.current < 0.92) {
        expansionDirectionRef.current = 1;
      }
    } else {
      if (expansionRef.current > 1.0) {
        expansionRef.current -= 0.005;
      }
      expansionRef.current = Math.max(1.0, expansionRef.current);
      expansionDirectionRef.current = 1;
    }

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
      if (isActive) {
        // Shifts to warm gold when AI is talking
        color.setRGB(0.85, 0.65, 0.15);
      } else {
        // Cream/off-white when idle
        color.setHex(0xf0ead8);
      }

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
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

export default function VoiceSphere({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  return (
    <div style={{ width: "100%", height: "100%", background: "transparent" }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={["#000000", 0.008]} />
        <ParticleSwarm isActive={isActive} />
        <OrbitControls autoRotate enableZoom={false} enablePan={false} />
        <Effects disableGamma>
          <unrealBloomPass
            threshold={0}
            strength={isActive ? 2.0 : 1.0}
            radius={isActive ? 0.6 : 0.3}
          />
        </Effects>
      </Canvas>
    </div>
  );
}
