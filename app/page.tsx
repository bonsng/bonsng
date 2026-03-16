"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import HeroCanvas from "./components/hero-canvas";
import PageShell from "./components/page-shell";
import { hero } from "./data/portfolio";
import { useSettings } from "./components/settings-context";

const CLICK_THRESHOLD = 6;

export default function Home() {
  const { language, theme, canvasBgColor } = useSettings();
  const router = useRouter();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerStart.current) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      pointerStart.current = null;

      if (distance < CLICK_THRESHOLD) {
        router.push("/explore");
      }
    },
    [router],
  );

  return (
    <PageShell fullBleed>
      <section className="grid h-full w-full grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="hero-reveal flex h-full flex-col justify-center gap-5 pl-8 pr-6 py-6 md:pl-14 md:pr-10 md:py-10 lg:pl-24 lg:pr-16">
          <p className="w-fit rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-chip-bg)] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[color:var(--ink-soft)] uppercase backdrop-blur">
            {hero.role[language]}
          </p>
          <h1 className="display-font text-4xl leading-[1.1] text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            {hero.name}
            <br />
            {hero.title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[color:var(--ink-soft)] sm:text-lg md:max-w-lg">
            {hero.intro[language]}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper)] transition-transform hover:-translate-y-0.5"
            >
              {language === "ko" ? "프로젝트 보기" : "View Projects"}
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--glass-chip-hover)]"
            >
              {language === "ko" ? "소개 보기" : "View About"}
            </Link>
          </div>
        </div>

        <div className="hero-reveal-delay h-full p-4 pt-2 md:py-8 md:pl-0 md:pr-14 lg:pr-20">
          <div
            className="glass-panel relative h-full w-full cursor-pointer overflow-hidden rounded-[2rem] transition-shadow hover:shadow-[0_18px_50px_rgba(229,93,36,0.18)]"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <HeroCanvas theme={theme} canvasBgColor={canvasBgColor} />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
              <span>{language === "ko" ? "클릭하여 탐색" : "Click to explore"}</span>
              <span className="inline-block animate-pulse">→</span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
