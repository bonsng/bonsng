import { contacts } from "../data/portfolio";
import PageShell from "../components/page-shell";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="display-font text-4xl text-[#151820] sm:text-5xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3d4352] sm:text-base">
          협업이나 채용 관련 문의는 아래 연락처로 편하게 주세요.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-panel rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[#151820a8] uppercase">
                {contact.label}
              </p>
              <p className="mt-3 text-base font-semibold text-[#151820]">{contact.value}</p>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
