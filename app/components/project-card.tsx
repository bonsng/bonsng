import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const liveIsExternal = project.live.startsWith("http");

  return (
    <article className="glass-panel rounded-3xl p-5">
      <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="display-font text-xl leading-tight text-[#151820]">{project.title}</h3>
      <p className="mt-1 text-xs font-semibold tracking-wide text-[#151820a8]">
        {project.period}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[#3d4352]">{project.description}</p>
      <div className="mt-4 flex items-center gap-3 text-sm">
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
  );
}
