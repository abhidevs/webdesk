import { createContext, useReducer } from "react";
import MaterialsReducer from "./MaterialsReducer";

const INITIAL_STATE = {
  allMaterials: [],
  recentMaterials: [],
  isFetching: false,
  error: false,
};

export const MaterialsContext = createContext(INITIAL_STATE);

export const MaterialsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MaterialsReducer, INITIAL_STATE);

  return (
    <MaterialsContext.Provider
      value={{
        allMaterials: state.allMaterials,
        recentMaterials: state.recentMaterials,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MaterialsContext.Provider>
  );
};
