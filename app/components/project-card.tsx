"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DetailItem, DetailSection, DetailSubSection, Project } from "../data/portfolio";
import type { Language } from "./settings-context";
import { useSettings } from "./settings-context";

type ProjectCardProps = {
  project: Project;
  preloadImage?: boolean;
};

export default function ProjectCard({ project, preloadImage = false }: ProjectCardProps) {
  const { language } = useSettings();
  const liveIsExternal = project.live.startsWith("http");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const el = backdropRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.target === el && !visible) {
        setMounted(false);
      }
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, closeModal]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="glass-panel group w-full cursor-pointer rounded-3xl p-5 text-left transition-transform hover:-translate-y-0.5"
      >
        <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={preloadImage}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <h3 className="display-font text-xl leading-tight text-[color:var(--ink)]">{project.title}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wide text-[color:var(--ink-soft)]">
          {project.period}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
          {project.description[language]}
        </p>
        <p className="mt-4 text-sm font-semibold text-[color:var(--ink)]">
          {language === "ko" ? "자세히 보기" : "View details"}
        </p>
      </button>

      {mounted && (
        <div
          ref={backdropRef}
          className={`fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm transition-[background-color,opacity] duration-300 ${visible ? "bg-[#11131a]/55 opacity-100" : "bg-[#11131a]/0 opacity-0"}`}
          onClick={closeModal}
        >
          <article
            className={`glass-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl text-[color:var(--ink)] transition-[transform,opacity] duration-300 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Hero image */}
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                aria-label={language === "ko" ? "닫기" : "Close"}
              >
                ✕
              </button>
            </div>

            <div className="p-5 md:p-6">
              {/* Title & period */}
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="display-font text-3xl leading-tight text-[color:var(--ink)]">{project.title}</h3>
                <span className="rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-3 py-0.5 text-xs font-semibold tracking-wide text-[color:var(--ink-soft)]">
                  {project.period}
                </span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-[color:var(--ink-soft)]">
                {project.description[language]}
              </p>

              {/* Links */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--glass-chip-hover)]"
                >
                  GitHub
                </a>
                {liveIsExternal ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--glass-chip-hover)]"
                  >
                    {language === "ko" ? "라이브 데모" : "Live Demo"}
                  </a>
                ) : (
                  <Link
                    href={project.live}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border-strong)] bg-[color:var(--glass-chip-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--glass-chip-hover)]"
                  >
                    {language === "ko" ? "라이브 데모" : "Live Demo"}
                  </Link>
                )}
              </div>

              {/* Divider */}
              <hr className="my-4 border-[color:var(--glass-border-strong)]" />

              {/* Details */}
              <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--ink-soft)]">
                {language === "ko" ? "상세 내용" : "Details"}
              </h4>
              <div className="mt-3 space-y-5">
                {project.details.map((section) => (
                  <SectionBlock key={section.title[language]} section={section} language={language} />
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

function BlogLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1.5 inline-flex shrink-0 items-center text-xs font-semibold text-[color:var(--accent)] hover:underline"
    >
      Blog
    </a>
  );
}

function ItemList({ items, language }: { items: DetailItem[]; language: Language }) {
  return (
    <ul className="mt-1 space-y-1 text-sm leading-relaxed text-[color:var(--ink-soft)]">
      {items.map((item) => (
        <li key={item[language]} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
          <span>
            {item[language]}
            {item.blog && <BlogLink href={item.blog} />}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SubSectionBlock({ sub, language }: { sub: DetailSubSection; language: Language }) {
  return (
    <div className="pl-4">
      <p className="text-sm font-semibold text-[color:var(--ink)]">
        {sub.title[language]}
        {sub.blog && <BlogLink href={sub.blog} />}
      </p>
      {sub.items.length > 0 && (
        <div className="pl-4">
          <ItemList items={sub.items} language={language} />
        </div>
      )}
    </div>
  );
}

function SectionBlock({ section, language }: { section: DetailSection; language: Language }) {
  return (
    <div>
      <h5 className="text-base font-bold text-[color:var(--ink)]">
        {section.title[language]}
        {section.blog && <BlogLink href={section.blog} />}
        {section.link && (
          <a
            href={section.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1.5 inline-flex items-center text-xs font-semibold text-[color:var(--accent)] hover:underline"
          >
            {section.link.label}
          </a>
        )}
      </h5>
      {section.subSections && section.subSections.length > 0 && (
        <div className="mt-1.5 space-y-2">
          {section.subSections.map((sub) => (
            <SubSectionBlock key={sub.title[language]} sub={sub} language={language} />
          ))}
        </div>
      )}
      {section.items && section.items.length > 0 && (
        <div className="pl-4">
          <ItemList items={section.items} language={language} />
        </div>
      )}
    </div>
  );
}
