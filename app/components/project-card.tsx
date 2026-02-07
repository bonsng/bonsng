"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const liveIsExternal = project.live.startsWith("http");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass-panel group w-full rounded-3xl p-5 text-left transition-transform hover:-translate-y-0.5"
      >
        <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <h3 className="display-font text-xl leading-tight text-[#151820]">{project.title}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wide text-[#151820a8]">
          {project.period}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#3d4352]">{project.description}</p>
        <p className="mt-4 text-sm font-semibold text-[#151820]">자세히 보기</p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#11131a]/55 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <article
            className="glass-panel w-full max-w-2xl rounded-3xl p-5 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="display-font text-2xl leading-tight text-[#151820]">{project.title}</h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-[#151820a8]">
                  {project.period}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#1518202e] bg-white/70 px-3 py-1 text-sm font-semibold text-[#151820] hover:bg-white"
              >
                닫기
              </button>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#3d4352]">
              {project.details.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#15182099]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#151820] underline"
              >
                Github
              </a>
              {liveIsExternal ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#151820] underline"
                >
                  Live Demo
                </a>
              ) : (
                <Link href={project.live} className="font-semibold text-[#151820] underline">
                  Live Demo
                </Link>
              )}
            </div>
          </article>
        </div>
      )}
    </>
  );
}
