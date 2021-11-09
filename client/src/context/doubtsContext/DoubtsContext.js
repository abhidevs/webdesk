import { createContext, useReducer } from "react";
import DoubtsReducer from "./DoubtsReducer";

const INITIAL_STATE = {
  allDoubts: [],
  recentDoubts: [],
  isFetching: false,
  error: false,
};

export const DoubtsContext = createContext(INITIAL_STATE);

export const DoubtsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoubtsReducer, INITIAL_STATE);

  return (
    <DoubtsContext.Provider
      value={{
        allDoubts: state.allDoubts,
        recentDoubts: state.recentDoubts,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </DoubtsContext.Provider>
  );
};
