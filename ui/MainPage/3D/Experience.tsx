"use client";

import { Suspense } from "react";
import Wave from "@/ui/components/Wave";

export default function Experience() {
  return (
    <>
      <Suspense fallback={null}>
        <Wave />
        <color attach="background" args={["black"]} />
      </Suspense>
    </>
  );
}
