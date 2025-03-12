"use client";

import { PageNumberProvider } from "@/ui/PageNumber/pageNumber.provider";
import { useEffect, useState } from "react";
import Nav from "@/ui/nav/Nav";
import MainPageHtml from "@/ui/MainPage/Html/MainPageHtml";
import Layer from "@/ui/MainPage/Html/Layer";
import Logo from "@/ui/nav/Logo";
import PaletteIcon from "@/public/svgs/palette.svg";
import ColorPicker from "@/ui/components/color-picker/ColorPicker";
import MainPage3D from "@/ui/MainPage/3D/MainPage3D";
import { ColorsProvider } from "@/ui/components/color-picker/colors.provider";

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
      <PageNumberProvider>
        <ColorsProvider>
          <MainPage3D />
          <Nav />
          <Logo />
          <Layer />
          <ColorPicker icon={<PaletteIcon />} />
          <MainPageHtml />
          {isMounted && <SplashScreen />}
        </ColorsProvider>
      </PageNumberProvider>
    </>
  );
}

const SplashScreen = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black text-white z-[100] flex justify-center items-center animate-splash-third text-2xl pb-12">
      <div className="mr-3 font-semibold animate-splash-first ">
        Bonseung Koo
      </div>
      <div className="font-thin animate-splash-second ">Portfolio</div>
    </div>
  );
};
