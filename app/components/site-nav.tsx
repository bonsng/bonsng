"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
      {isDesktop && !showNav && (
        <div className="nav-reveal-indicator pointer-events-none fixed inset-x-0 bottom-2 z-40 flex justify-center px-4">
          <div className="flex flex-col items-center gap-1.5">
            {!hasOpened && (
              <span className="nav-reveal-text rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#182033]/80 uppercase">
                Move cursor down to open menu
              </span>
            )}
            <ChevronDown className="nav-reveal-arrow h-5 w-5 text-[#182033]/70" strokeWidth={2.4} />
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
                    ? "liquid-link-active text-[#10131b]"
                    : "text-[#1c2230] hover:bg-white/45"
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
