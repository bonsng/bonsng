import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { ProjectModalRenderer } from "@/ui/modal/project-modal-renderer";

type ModalState = {
  isOpen: boolean;
  props: { title: string };
};

const initialState: ModalState = {
  isOpen: false,
  props: { title: "Bonsng" },
};

type ModalAction =
  | {
      type: "OPEN_MODAL";
      props: { title: string };
    }
  | { type: "CLOSE_MODAL" };

export const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}>({ state: initialState, dispatch: () => undefined });

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        props: action.props,
      };
    case "CLOSE_MODAL":
      return initialState;
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
      <ProjectModalRenderer />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
