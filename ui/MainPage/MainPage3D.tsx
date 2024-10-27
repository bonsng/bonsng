"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Wave from "@/ui/components/Wave";

export default function MainPage3D() {
  return (
    <div className="h-screen">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 0] }}>
        <Suspense fallback={null}>
          <Wave />
          <color attach="background" args={["black"]} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
