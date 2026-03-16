"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import ExploreCanvas from "../components/explore-canvas";
import PageShell from "../components/page-shell";
import ProjectModal from "../components/project-modal";
import { useSettings } from "../components/settings-context";
import type { Project } from "../data/portfolio";

export default function ExplorePage() {
  const { language, theme, canvasBgColor } = useSettings();
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
      <ExploreCanvas theme={theme} canvasBgColor={canvasBgColor} onSelectProject={openProject} />

      <div className="absolute left-6 top-6 z-10 flex items-center gap-4 md:left-10 md:top-8">
        <Link
          href="/"
          className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--glass-chip-hover)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {language === "ko" ? "홈으로" : "Home"}
        </Link>
        <p className="pointer-events-none text-sm font-semibold tracking-wide text-[color:var(--ink-soft)]">
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
