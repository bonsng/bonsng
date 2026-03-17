"use client";

import { useRouter } from "next/navigation";
import HeroCanvas from "./hero-canvas";
import { useSettings } from "./settings-context";

export default function HeroSection() {
  const { language, theme, canvasBgColor } = useSettings();
  const router = useRouter();

  return (
    <div className="hero-reveal-delay flex h-full items-center justify-center p-4 pt-2 md:py-8 md:pl-0 md:pr-14 lg:pr-20">
      <div
        className="relative h-[85%] w-full cursor-pointer will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[0.98] active:scale-[0.96]"
        onClick={() => router.push("/explore")}
      >
        <div className="glass-panel h-full w-full overflow-hidden rounded-[2rem]">
          <HeroCanvas theme={theme} canvasBgColor={canvasBgColor} />
        </div>
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          <span>{language === "ko" ? "클릭하여 탐색" : "Click to explore"}</span>
          <span className="inline-block animate-pulse">→</span>
        </div>
      </div>
    </div>
  );
}
