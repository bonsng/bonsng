"use client";

import { Canvas } from "@react-three/fiber";
import useScrollMove from "@/ui/components/hooks/useScrollMove";
import Experience from "@/ui/MainPage/Experience";
import { Leva } from "leva";
import { useEffect, useState } from "react";

export default function MainPage3D() {
  const animatedItem = useScrollMove();
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
    <div
      className="h-screen bg-cod-gray w-screen"
      {...animatedItem}
      id={"main-header"}
    >
      <div className="h-[110vh] w-full fixed" id={"wrapper-3d"}>
        <Leva hidden={isDebugMode} />
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 0] }}>
          <Experience />
        </Canvas>
      </div>
    </div>
  );
}
