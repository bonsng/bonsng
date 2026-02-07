"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <nav className="glass-panel mx-auto flex w-fit items-center gap-1 rounded-full p-1.5">
        {menus.map((menu) => {
          const active = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#151820] text-white"
                  : "text-[#151820] hover:bg-white/70"
              }`}
            >
              {menu.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
