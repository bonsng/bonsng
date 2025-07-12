import { FC, useEffect, useRef } from "react";
import { useModalContext } from "@/ui/modal/modal-context.provider";
import { ModalRef } from "@/ui/modal/modal.type";
import ProjectModal from "@/ui/modal/project-modal";

export const ProjectModalRenderer: FC = () => {
  const { state } = useModalContext();
  const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (!state.isOpen) {
      modalRef.current?.close();
    } else {
      modalRef.current?.open();
    }
  }, [state.isOpen, state.props]);

  if (!state.isOpen) return null;

  return <ProjectModal title={state.props.title} />;
};
