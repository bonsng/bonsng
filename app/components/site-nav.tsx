"use client";

import { ChevronDown, Globe2, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSettings } from "./settings-context";

const menus = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeDesktopChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export default function SiteNav() {
  const { language, setLanguage, theme, setTheme } = useSettings();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const isDesktop = useSyncExternalStore(subscribeDesktopChange, getDesktopSnapshot, () => false);
  const [showNav, setShowNav] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) {
        return;
      }

      const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
        `a[data-nav-item="${pathname}"]`,
      );

      if (!activeLink) {
        return;
      }

      setIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    };

    updateIndicator();

    const observer = new ResizeObserver(updateIndicator);
    if (navRef.current) {
      observer.observe(navRef.current);
    }
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const revealZone = 110;
    const onMouseMove = (event: MouseEvent) => {
      const nextShow = window.innerHeight - event.clientY <= revealZone;
      setShowNav(nextShow);
      if (nextShow) {
        setHasOpened(true);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isDesktop]);

  return (
    <>
      <div className="fixed right-4 top-4 z-[55] md:right-6 md:top-5">
        <div className="glass-panel flex items-center gap-1 rounded-full p-1">
          <button
            type="button"
            onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
            className="settings-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            aria-label={language === "ko" ? "언어 변경" : "Switch language"}
          >
            <Globe2 className="h-3.5 w-3.5" />
            {language === "ko" ? "KO" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="settings-pill inline-flex items-center rounded-full p-2"
            aria-label={theme === "dark" ? "라이트 모드" : "다크 모드"}
            title={theme === "dark" ? (language === "ko" ? "라이트 모드" : "Light mode") : language === "ko" ? "다크 모드" : "Dark mode"}
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {isDesktop && !showNav && (
        <div className="nav-reveal-indicator pointer-events-none fixed inset-x-0 bottom-2 z-40 flex justify-center px-4">
          <div className="flex flex-col items-center gap-1.5">
            {!hasOpened && (
              <span className="nav-reveal-text rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--ink-soft)] uppercase">
                {language === "ko" ? "아래로 마우스를 내리면 메뉴가 열립니다" : "Move cursor down to open menu"}
              </span>
            )}
            <ChevronDown className="nav-reveal-arrow h-5 w-5 text-[color:var(--ink-soft)]" strokeWidth={2.4} />
          </div>
        </div>
      )}
      <header
        className={`fixed inset-x-0 bottom-5 z-50 px-4 transition-all duration-300 md:duration-400 ${
          !isDesktop || showNav
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          ref={navRef}
          className="liquid-nav mx-auto flex w-fit items-center gap-1 rounded-full p-1.5"
          onFocusCapture={() => setShowNav(true)}
        >
          <span
            className="liquid-indicator"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
              opacity: indicator.width > 0 ? 1 : 0,
            }}
          />
          {menus.map((menu) => {
            const active = pathname === menu.href;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                data-nav-item={menu.href}
                className={`liquid-link rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "liquid-link-active text-[color:var(--ink)]"
                    : "text-[color:var(--ink)] hover:bg-[color:var(--glass-chip-bg)]"
                }`}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
