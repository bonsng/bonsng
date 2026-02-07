import PageShell from "../components/page-shell";
import { education, profile, skills } from "../data/portfolio";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="display-font text-4xl text-[#151820] sm:text-5xl">About</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-3xl p-6">
            <h2 className="display-font text-2xl text-[#151820]">Profile</h2>
            <p className="mt-4 text-base leading-relaxed text-[#3d4352]">{profile}</p>
          </article>
          <article className="glass-panel rounded-3xl p-6">
            <h2 className="display-font text-2xl text-[#151820]">Education</h2>
            <p className="mt-4 text-base font-semibold text-[#151820]">{education.school}</p>
            <p className="mt-1 text-sm text-[#3d4352]">{education.period}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <h2 className="display-font text-3xl text-[#151820]">Skills</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="glass-panel rounded-3xl p-5">
            <h3 className="display-font text-xl text-[#151820]">Languages</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.languages.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1518202b] bg-white/70 px-3 py-1 text-xs font-semibold text-[#151820]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="glass-panel rounded-3xl p-5">
            <h3 className="display-font text-xl text-[#151820]">Frontend</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.frontend.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1518202b] bg-white/70 px-3 py-1 text-xs font-semibold text-[#151820]"
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
