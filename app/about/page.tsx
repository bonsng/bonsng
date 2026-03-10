"use client";

import PageShell from "../components/page-shell";
import { useSettings } from "../components/settings-context";
import { education, profile, skills } from "../data/portfolio";

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
        <article className="glass-panel mt-5 rounded-3xl p-5">
          <table className="w-full text-left">
            <tbody>
              {skills.map((row) => (
                <tr key={row.category} className="border-b border-[color:var(--glass-border-strong)] last:border-b-0">
                  <td className="whitespace-nowrap py-3 pr-6 text-sm font-bold text-[color:var(--ink)]">
                    {row.category}
                  </td>
                  <td className="py-3 text-sm text-[color:var(--ink-soft)]">
                    {row.items.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </PageShell>
  );
}
