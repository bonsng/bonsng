import { useModalContext } from "@/ui/modal/modal-context.provider";
import { useCallback } from "react";

export const useModal = () => {
  const { state, dispatch } = useModalContext();

  const openModal = useCallback(
    (props: { title: string }) => {
      dispatch({ type: "OPEN_MODAL", props });
    },
    [dispatch],
  );

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, [dispatch]);

  const isOpen = state.isOpen;

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
