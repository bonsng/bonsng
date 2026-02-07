import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  fullBleed?: boolean;
};

export default function PageShell({ children, fullBleed = false }: PageShellProps) {
  return (
    <main
      className={`relative isolate overflow-x-clip ${
        fullBleed
          ? "h-screen overflow-hidden px-0 py-0"
          : "min-h-screen px-6 pb-12 pt-28 md:px-12 lg:px-16"
      }`}
    >
      <div className="noise-overlay absolute inset-0 -z-20" />
      <div className="float-a pointer-events-none absolute -left-16 -top-6 -z-10 h-56 w-56 rounded-full bg-[#ffb88a]/55 blur-3xl" />
      <div className="float-b pointer-events-none absolute right-0 top-[28rem] -z-10 h-64 w-64 rounded-full bg-[#4eb4ad]/35 blur-3xl" />
      {children}
    </main>
  );
}
