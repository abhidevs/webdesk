import { createContext, useReducer } from "react";
import TasksReducer from "./TasksReducer";

const INITIAL_STATE = {
  allTasks: [],
  recentTasks: [],
  isFetching: false,
  error: false,
};

export const TasksContext = createContext(INITIAL_STATE);

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, INITIAL_STATE);

  return (
    <TasksContext.Provider
      value={{
        allTasks: state.allTasks,
        recentTasks: state.recentTasks,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
