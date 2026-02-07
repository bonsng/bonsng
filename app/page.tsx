import Link from "next/link";
import HeroCanvas from "./components/hero-canvas";
import PageShell from "./components/page-shell";
import { education, hero } from "./data/portfolio";

export default function Home() {
  return (
    <PageShell fullBleed>
      <section className="grid h-full w-full grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="hero-reveal flex h-full flex-col justify-center gap-5 pl-8 pr-6 py-6 md:pl-14 md:pr-10 md:py-10 lg:pl-24 lg:pr-16">
          <p className="w-fit rounded-full border border-[#1518201f] bg-white/75 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[#151820b8] uppercase backdrop-blur">
            Frontend Engineer
          </p>
          <h1 className="display-font text-4xl leading-[1.1] text-[#151820] sm:text-5xl lg:text-6xl">
            {hero.name}
            <br />
            {hero.title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[#3d4352] sm:text-lg md:max-w-lg">
            {hero.intro}
          </p>
          <div className="glass-panel w-fit rounded-2xl px-4 py-3 text-sm text-[#3d4352]">
            {education.school} ({education.period})
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-[#151820] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[#15182040] bg-white/70 px-5 py-3 text-sm font-semibold text-[#151820] transition-colors hover:bg-white"
            >
              소개 보기
            </Link>
          </div>
        </div>

        <div className="hero-reveal-delay h-full p-4 pt-2 md:py-8 md:pl-0 md:pr-14 lg:pr-20">
          <div className="glass-panel relative h-full w-full overflow-hidden rounded-[2rem]">
            <HeroCanvas />
            <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold tracking-wide text-white">
              React Three Fiber
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
