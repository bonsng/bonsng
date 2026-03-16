"use client";

import { Environment, Html, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
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
        occlude
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
        occlude
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

function NonRaycastableSparkles(props: React.ComponentProps<typeof Sparkles>) {
  const ref = useRef<THREE.Points>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.raycast = () => {};
    }
  }, []);

  return <Sparkles ref={ref} {...props} />;
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
      gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
      className="h-full w-full"
    >
      <color attach="background" args={[isDark ? "#0a0e1a" : "#f9f4ea"]} />

      {/* HDRI 환경맵 — 메탈릭 반사용 (배경에는 표시하지 않음) */}
      <Environment preset="studio" background={false} environmentIntensity={isDark ? 1.2 : 0.8} />

      {/* 앰비언트: 기본 조명 */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} />

      {/* 키 라이트: 따뜻한 오렌지/골드, 우측 상단 */}
      <directionalLight
        position={[5, 6, 3]}
        intensity={isDark ? 3.0 : 1.5}
        color="#ffb066"
      />

      {/* 필 라이트: 차가운 블루/퍼플, 좌측 하단 */}
      <directionalLight
        position={[-4, -1, -3]}
        intensity={isDark ? 1.2 : 0.6}
        color="#7b68ee"
      />

      {/* 림 라이트: 뒤쪽에서 윤곽을 살리는 역광 */}
      <pointLight
        position={[0, 2, -6]}
        intensity={isDark ? 5.0 : 3.0}
        color="#e0c0ff"
        distance={20}
        decay={2}
      />

      {/* 바닥 반사광: 아래에서 올라오는 청록 포인트 라이트 */}
      <pointLight
        position={[0, -4, 0]}
        intensity={isDark ? 2.5 : 1.0}
        color="#4eb4ad"
        distance={15}
        decay={2}
      />

      <Scene onSelectProject={onSelectProject} />

      <NonRaycastableSparkles
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
