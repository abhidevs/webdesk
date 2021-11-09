import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { SubjectsContextProvider } from "./context/subjectsContext/SubjectsContext";
import { MaterialsContextProvider } from "./context/materialsContext/MaterialsContext";
import { TasksContextProvider } from "./context/tasksContext/TasksContext";
import { SchedulesContextProvider } from "./context/schedulesContext/SchedulesContext";
import { DoubtsContextProvider } from "./context/doubtsContext/DoubtsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SubjectsContextProvider>
        <MaterialsContextProvider>
          <TasksContextProvider>
            <SchedulesContextProvider>
              <DoubtsContextProvider>
                <App />
              </DoubtsContextProvider>
            </SchedulesContextProvider>
          </TasksContextProvider>
        </MaterialsContextProvider>
      </SubjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
