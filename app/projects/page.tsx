import PageShell from "../components/page-shell";
import ProjectCard from "../components/project-card";
import { projects } from "../data/portfolio";

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl pb-24 md:pb-0">
        <h1 className="display-font text-4xl text-[#151820] sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3d4352] sm:text-base">
          기존 포트폴리오에 담았던 프로젝트를 새 구조에 이식했습니다.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
