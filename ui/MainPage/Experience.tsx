"use client";

import { Suspense } from "react";
import Wave from "@/ui/components/Wave";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <Suspense fallback={null}>
        <Wave />
        <color attach="background" args={["black"]} />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </>
  );
}
