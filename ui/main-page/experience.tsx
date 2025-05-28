"use client";

import Wave from "@/ui/main-page/wave";

export default function Experience() {
  return (
    <>
      <Wave />
      <color attach="background" args={["black"]} />

      <ambientLight intensity={300} />
    </>
  );
}
