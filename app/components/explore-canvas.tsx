"use client";

import { Html, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";
import CenterShape from "./center-shape";
import type { Theme } from "./settings-context";
import { useSettings } from "./settings-context";
import type { Project } from "../data/portfolio";
import { projects } from "../data/portfolio";

type ExploreCanvasProps = {
  theme: Theme;
  onSelectProject: (project: Project) => void;
};

const CLICK_THRESHOLD = 6;

const PROJECT_COLORS = ["#e55d24", "#0f8b8d", "#ffb88a", "#6c5ce7", "#fd79a8"];

function getProjectPositions(count: number, radius: number): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });
}

function ProjectNode({
  project,
  position,
  color,
  onSelect,
}: {
  project: Project;
  position: [number, number, number];
  color: string;
  onSelect: (project: Project) => void;
}) {
  const { language } = useSettings();
  const meshRef = useRef<THREE.Mesh>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const hovered = useRef(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    const targetScale = hovered.current ? 1.15 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
  });

  const onPointerDown = useCallback(
    (e: { stopPropagation: () => void; nativeEvent: PointerEvent }) => {
      e.stopPropagation();
      pointerStart.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    },
    [],
  );

  const onPointerUp = useCallback(
    (e: { stopPropagation: () => void; nativeEvent: PointerEvent }) => {
      e.stopPropagation();
      if (!pointerStart.current) return;
      const dx = e.nativeEvent.clientX - pointerStart.current.x;
      const dy = e.nativeEvent.clientY - pointerStart.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      pointerStart.current = null;
      if (distance < CLICK_THRESHOLD) {
        onSelect(project);
      }
    },
    [onSelect, project],
  );

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOver={() => {
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
      >
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>
      <Html
        position={[0, -1.1, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="whitespace-nowrap rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {project.title}
        </div>
      </Html>
      <Html
        position={[0, -1.5, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="whitespace-nowrap text-[10px] text-[color:var(--ink-soft)]">
          {project.description[language]}
        </div>
      </Html>
    </group>
  );
}

function Scene({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  const positions = getProjectPositions(projects.length, 5);

  return (
    <>
      <CenterShape />
      {projects.map((project, i) => (
        <ProjectNode
          key={project.title}
          project={project}
          position={positions[i]}
          color={PROJECT_COLORS[i % PROJECT_COLORS.length]}
          onSelect={onSelectProject}
        />
      ))}
    </>
  );
}

export default function ExploreCanvas({ theme, onSelectProject }: ExploreCanvasProps) {
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 5, 12], fov: 50 }}
      dpr={[1, 1.6]}
      className="h-full w-full"
    >
      <color attach="background" args={[isDark ? "#11141d" : "#f9f4ea"]} />
      <ambientLight intensity={isDark ? 0.5 : 0.6} />
      <directionalLight position={[3, 5, 4]} intensity={isDark ? 0.9 : 1.05} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={isDark ? 0.8 : 0.6} color="#4eb4ad" />

      <Scene onSelectProject={onSelectProject} />

      <Sparkles
        count={120}
        scale={14}
        size={2}
        speed={0.2}
        color={isDark ? "#a0e8ff" : "#ffffff"}
        opacity={isDark ? 0.3 : 0.45}
      />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
