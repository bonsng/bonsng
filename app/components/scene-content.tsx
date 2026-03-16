"use client";

import { Environment, Sparkles } from "@react-three/drei";
import CenterShape from "./center-shape";
import OrbitingDot from "./orbiting-dot";

export default function SceneContent({ isDark }: { isDark: boolean }) {
  return (
    <>
      <Environment files="/hdri/studio_small_03_1k.hdr" background={false} environmentIntensity={isDark ? 1.2 : 0.8} />

      <ambientLight intensity={isDark ? 0.4 : 0.6} />

      {/* 키 라이트: 따뜻한 오렌지/골드, 우측 상단 */}
      <directionalLight position={[5, 6, 3]} intensity={isDark ? 3.0 : 1.5} color="#ffb066" />

      {/* 필 라이트: 차가운 블루/퍼플, 좌측 하단 */}
      <directionalLight position={[-4, -1, -3]} intensity={isDark ? 1.2 : 0.6} color="#7b68ee" />

      {/* 림 라이트: 뒤쪽 역광 */}
      <pointLight position={[0, 2, -6]} intensity={isDark ? 5.0 : 3.0} color="#e0c0ff" distance={20} decay={2} />

      {/* 바닥 반사광: 청록 */}
      <pointLight position={[0, -4, 0]} intensity={isDark ? 2.5 : 1.0} color="#4eb4ad" distance={15} decay={2} />

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
    </>
  );
}
