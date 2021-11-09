import { createContext, useReducer } from "react";
import SchedulesReducer from "./SchedulesReducer";

const INITIAL_STATE = {
  schedules: [],
  isFetching: false,
  error: false,
};

export const SchedulesContext = createContext(INITIAL_STATE);

export const SchedulesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SchedulesReducer, INITIAL_STATE);

  return (
    <SchedulesContext.Provider
      value={{
        schedules: state.schedules,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};
