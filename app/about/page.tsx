"use client";

import PageShell from "../components/page-shell";
import { useSettings } from "../components/settings-context";
import { education, profile, skills } from "../data/portfolio";

export default function AboutPage() {
  const { language } = useSettings();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="display-font text-4xl text-[color:var(--ink)] sm:text-5xl">
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
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.languages.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="glass-panel rounded-3xl p-5">
            <h3 className="display-font text-xl text-[color:var(--ink)]">Frontend</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.frontend.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
