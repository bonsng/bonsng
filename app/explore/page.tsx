"use client";

import { useCallback, useRef, useState } from "react";
import ExploreCanvas from "../components/explore-canvas";
import PageShell from "../components/page-shell";
import ProjectModal from "../components/project-modal";
import { useSettings } from "../components/settings-context";
import type { Project } from "../data/portfolio";

export default function ExplorePage() {
  const { language, theme } = useSettings();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === backdropRef.current && !modalVisible) {
        setSelectedProject(null);
      }
    },
    [modalVisible],
  );

  return (
    <PageShell fullBleed>
      <ExploreCanvas theme={theme} onSelectProject={openProject} />

      <div className="pointer-events-none absolute left-6 top-6 z-10 md:left-10 md:top-8">
        <p className="text-sm font-semibold tracking-wide text-[color:var(--ink-soft)]">
          {language === "ko"
            ? "드래그하여 탐색 · 프로젝트를 클릭하여 상세 보기"
            : "Drag to explore · Click a project for details"}
        </p>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          visible={modalVisible}
          backdropRef={backdropRef}
          onClose={closeModal}
          onTransitionEnd={onTransitionEnd}
          language={language}
        />
      )}
    </PageShell>
  );
}
