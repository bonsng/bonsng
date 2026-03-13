"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../data/portfolio";
import ProjectModal from "./project-modal";
import { useSettings } from "./settings-context";

type ProjectCardProps = {
  project: Project;
  preloadImage?: boolean;
};

export default function ProjectCard({ project, preloadImage = false }: ProjectCardProps) {
  const { language } = useSettings();
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

  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === backdropRef.current && !visible) {
        setMounted(false);
      }
    },
    [visible],
  );

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
        <ProjectModal
          project={project}
          visible={visible}
          backdropRef={backdropRef}
          onClose={closeModal}
          onTransitionEnd={onTransitionEnd}
          language={language}
        />
      )}
    </>
  );
}
