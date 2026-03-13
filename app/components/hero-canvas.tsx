"use client";

import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CenterShape from "./center-shape";
import OrbitingDot from "./orbiting-dot";
import type { Theme } from "./settings-context";

type HeroCanvasProps = {
  theme: Theme;
};

export default function HeroCanvas({ theme }: HeroCanvasProps) {
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 48 }}
      dpr={[1, 1.6]}
      className="h-full w-full"
    >
      <color attach="background" args={[isDark ? "#11141d" : "#f9f4ea"]} />
      <ambientLight intensity={isDark ? 0.55 : 0.65} />
      <directionalLight
        position={[2, 3, 4]}
        intensity={isDark ? 0.95 : 1.1}
        color="#ffffff"
      />
      <pointLight
        position={[-3, -1, 2]}
        intensity={isDark ? 0.95 : 0.75}
        color="#4eb4ad"
      />

      <CenterShape />
      <OrbitingDot position={[-2, 1, -0.4]} color="#0f8b8d" />
      <OrbitingDot position={[2, -1.2, 0.2]} color="#ffb88a" />

      <Sparkles
        count={80}
        scale={5.2}
        size={2}
        speed={0.25}
        color={isDark ? "#a0e8ff" : "#ffffff"}
        opacity={isDark ? 0.35 : 0.5}
      />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={2.8}
        maxDistance={7.2}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </Canvas>
  );
}
