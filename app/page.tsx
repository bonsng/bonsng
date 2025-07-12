"use client";

import { useEffect, useState } from "react";
import MainPage3D from "@/ui/main-page/main-page-3d";
import Nav from "@/ui/nav/nav";
import Logo from "@/ui/nav/logo";
import Layer from "@/ui/main-page/layer";
import ColorPicker from "@/ui/components/color-picker/color-picker";

export default function Home() {
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <MainPage3D />
      <Nav />
      <Logo />
      <Layer />
      <ColorPicker />
      {isMounted && <SplashScreen />}
    </>
  );
}

const SplashScreen = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black text-white z-[100] flex justify-center items-center animate-splashThird text-2xl pb-12">
      <div className="mr-3 font-semibold animate-splashFirst">Bonseung Koo</div>
      <div className="font-thin animate-splashSecond">Portfolio</div>
    </div>
  );
};
