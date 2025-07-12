import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/modal/modal.type";
import { useModal } from "@/ui/hooks/modal.hook";

export type ProjectModalProps = {
  title: string;
};

const ProjectModal = forwardRef<ModalRef, ProjectModalProps>(
  ({ title }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { closeModal } = useModal();
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        closeModal();
        setIsClosing(false);
      }, 200);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
      isOpen,
    }));

    return (
      <div
        className={`fixed inset-0 z-40 bg-transparent flex justify-center items-center ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={handleClose}
      >
        <div
          className={`relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-3/4 h-3/4 flex gap-4 text-white ${
            isClosing ? "animate-scale-out" : "animate-scale-in"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-2 right-4 text-gray-500 hover:text-white text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
          {title}
        </div>
      </div>
    );
  },
);

ProjectModal.displayName = "ProjectModal";
export default ProjectModal;
