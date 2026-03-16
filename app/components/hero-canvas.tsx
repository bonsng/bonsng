"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import CanvasLoader from "./canvas-loader";
import SceneContent from "./scene-content";
import type { Theme } from "./settings-context";

type HeroCanvasProps = {
  theme: Theme;
  canvasBgColor: string;
};

export default function HeroCanvas({ theme, canvasBgColor }: HeroCanvasProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 48 }}
        dpr={[1, 1.6]}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        className="h-full w-full"
      >
        <color attach="background" args={[canvasBgColor]} />
        <Suspense fallback={null}>
          <SceneContent isDark={isDark} />
        </Suspense>
      </Canvas>
      <CanvasLoader />
    </div>
  );
}
