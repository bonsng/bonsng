"use client";

import { contacts } from "../data/portfolio";
import PageShell from "../components/page-shell";
import { useSettings } from "../components/settings-context";

export default function ContactPage() {
  const { language } = useSettings();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="display-font text-4xl text-[color:var(--ink)] sm:text-5xl">
          {language === "ko" ? "연락처" : "Contact"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-soft)] sm:text-base">
          {language === "ko"
            ? "협업이나 채용 관련 문의는 아래 연락처로 편하게 주세요."
            : "Feel free to reach out through the contacts below for collaboration or hiring inquiries."}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.label.en}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-panel rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
                {contact.label[language]}
              </p>
              <p className="mt-3 text-base font-semibold text-[color:var(--ink)]">{contact.value}</p>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
