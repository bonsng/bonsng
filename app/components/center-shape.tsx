"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function CenterShape() {
  const shapeRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!shapeRef.current) {
      return;
    }
    shapeRef.current.rotation.x += delta * 0.2;
    shapeRef.current.rotation.y += delta * 0.35;
    shapeRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.7}>
      <mesh ref={shapeRef}>
        <torusKnotGeometry args={[1, 0.32, 210, 32]} />
        <MeshDistortMaterial
          color="#e55d24"
          emissive="#e55d24"
          emissiveIntensity={0.18}
          roughness={0.18}
          metalness={0.45}
          distort={0.32}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}
