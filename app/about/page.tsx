"use client";

import type { IconType } from "react-icons";
import {
  SiCss3,
  SiFramer,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { Braces, ExternalLink } from "lucide-react";
import PageShell from "../components/page-shell";
import { useSettings } from "../components/settings-context";
import { education, profile, skills } from "../data/portfolio";

const skillTone = {
  languages: "from-sky-500/20 via-cyan-500/10 to-transparent",
  frontend: "from-emerald-500/20 via-lime-400/10 to-transparent",
} as const;

const skillIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Python: SiPython,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Three.js": SiThreedotjs,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
};

const skillLinks: Record<string, string> = {
  JavaScript: "https://developer.mozilla.org/docs/Web/JavaScript",
  TypeScript: "https://www.typescriptlang.org/",
  HTML5: "https://developer.mozilla.org/docs/Web/HTML",
  CSS3: "https://developer.mozilla.org/docs/Web/CSS",
  Python: "https://www.python.org/",
  React: "https://react.dev/",
  "Next.js": "https://nextjs.org/",
  "Three.js": "https://threejs.org/",
  Redux: "https://redux.js.org/",
  "Tailwind CSS": "https://tailwindcss.com/",
  "Framer Motion": "https://motion.dev/",
  Zustand: "https://zustand.docs.pmnd.rs/",
};

function SkillGrid({ items, tone }: { items: string[]; tone: string }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const href = skillLinks[item];

        return (
          <a
            key={item}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-2xl border border-[color:var(--glass-border-strong)] bg-gradient-to-br ${tone} bg-[color:var(--glass-chip-bg)] p-3 transition-transform duration-200 hover:-translate-y-0.5`}
          >
            <span className="pointer-events-none absolute right-2 top-2 text-[color:var(--ink-soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden>
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-hover)] text-[11px] font-bold text-[color:var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                {(() => {
                  const Icon = skillIcons[item];
                  if (Icon) return <Icon className="h-4 w-4" aria-hidden />;
                  if (item === "Zustand") return <Braces className="h-4 w-4" aria-hidden />;
                  return item.slice(0, 2).toUpperCase();
                })()}
              </span>
              <span className="text-sm font-semibold tracking-wide text-[color:var(--ink)]">{item}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  const { language } = useSettings();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="display-font text-5xl text-[color:var(--ink)] sm:text-6xl">
          {language === "ko" ? "소개" : "About"}
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-3xl p-6">
            <h2 className="display-font text-2xl text-[color:var(--ink)]">
              {language === "ko" ? "프로필" : "Profile"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:var(--ink-soft)]">
              {profile[language]}
            </p>
          </article>
          <article className="glass-panel rounded-3xl p-6">
            <h2 className="display-font text-2xl text-[color:var(--ink)]">
              {language === "ko" ? "학력" : "Education"}
            </h2>
            <p className="mt-4 text-base font-semibold text-[color:var(--ink)]">
              {education.school[language]}
            </p>
            <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{education.period}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <h2 className="display-font text-3xl text-[color:var(--ink)]">
          {language === "ko" ? "기술 스택" : "Skills"}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="glass-panel rounded-3xl p-5">
            <h3 className="display-font text-xl text-[color:var(--ink)]">
              {language === "ko" ? "언어" : "Languages"}
            </h3>
            <SkillGrid items={skills.languages} tone={skillTone.languages} />
          </article>
          <article className="glass-panel rounded-3xl p-5">
            <h3 className="display-font text-xl text-[color:var(--ink)]">Frontend</h3>
            <SkillGrid items={skills.frontend} tone={skillTone.frontend} />
          </article>
        </div>
      </section>
    </PageShell>
  );
}
