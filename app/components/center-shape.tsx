"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import type { Group } from "three";

export default function CenterShape() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/bumpy_sphere.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 2.5;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.7}>
      <primitive ref={groupRef} object={clonedScene} scale={0.5} />
    </Float>
  );
}

useGLTF.preload("/models/bumpy_sphere.glb");
