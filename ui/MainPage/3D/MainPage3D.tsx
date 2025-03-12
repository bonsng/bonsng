"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/ui/MainPage/3D/Experience";
import { Leva } from "leva";
import { useEffect, useState } from "react";

export default function MainPage3D() {
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsDebugMode(window.location.hash !== "#debug");
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="fixed h-screen w-full ">
      <div className="h-full w-full" id={"wrapper-3d"}>
        <Leva hidden={isDebugMode} />
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 0] }}>
          <Experience />
        </Canvas>
      </div>
    </div>
  );
}
