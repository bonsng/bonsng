import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type ColorsState = {
  currentColor: string;
};

type ColorsAction = { type: "SET_COLOR"; payload: string };

const initialState: ColorsState = {
  currentColor: "#82bce0",
};

export const ColorsContext = createContext<{
  state: ColorsState;
  dispatch: Dispatch<ColorsAction>;
}>({ state: initialState, dispatch: () => undefined });

const currentColorReducer = (
  state: ColorsState,
  action: ColorsAction,
): ColorsState => {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, currentColor: action.payload };
    default:
      return state;
  }
  throw new Error("[ERROR] unknown action type");
};

export const ColorsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(currentColorReducer, initialState);

  return (
    <ColorsContext.Provider value={{ state, dispatch }}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColorsState = () => {
  const context = useContext(ColorsContext);
  if (!context)
    throw new Error("useContext must be used within a StateProvider");

  return context;
};
