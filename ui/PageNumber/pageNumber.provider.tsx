import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type PageNumberState = {
  pageNumber: number;
};

type PageNumberAction = { type: "SET_PAGE_NUMBER"; payload: number };

const initialState: PageNumberState = {
  pageNumber: 0,
};

export const PageNumberContext = createContext<{
  state: PageNumberState;
  dispatch: Dispatch<PageNumberAction>;
}>({ state: initialState, dispatch: () => undefined });

const pageNumberReducer = (
  state: PageNumberState,
  action: PageNumberAction,
): PageNumberState => {
  switch (action.type) {
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: action.payload };
    default:
      return state;
  }
  throw new Error("[ERROR] unknown action type");
};

export const PageNumberProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(pageNumberReducer, initialState);

  return (
    <PageNumberContext.Provider value={{ state, dispatch }}>
      {children}
    </PageNumberContext.Provider>
  );
};

export const usePageNumberState = () => {
  const context = useContext(PageNumberContext);
  if (!context)
    throw new Error("useContext must be used within a StateProvider");

  return context;
};
