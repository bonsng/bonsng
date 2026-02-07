"use client";

import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function CenterShape() {
  const shapeRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!shapeRef.current) {
      return;
    }
    shapeRef.current.rotation.x += delta * 0.2;
    shapeRef.current.rotation.y += delta * 0.35;
    shapeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
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

function OrbitingDot({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <icosahedronGeometry args={[0.16, 1]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4.3], fov: 48 }} dpr={[1, 1.6]} className="h-full w-full">
      <color attach="background" args={["#f9f4ea"]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -1, 2]} intensity={0.75} color="#4eb4ad" />

      <CenterShape />
      <OrbitingDot position={[-2, 1, -0.4]} color="#0f8b8d" />
      <OrbitingDot position={[2, -1.2, 0.2]} color="#ffb88a" />

      <Sparkles
        count={80}
        scale={5.2}
        size={2}
        speed={0.25}
        color="#ffffff"
        opacity={0.5}
      />

      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.45} />
    </Canvas>
  );
}
