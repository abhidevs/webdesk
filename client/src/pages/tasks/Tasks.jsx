import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Herosection from "../../components/herosection/Herosection";
import { taskArray } from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";
import Material from "../../components/material/Material";
import Task from '../../components/task/Task'


const Tasks = ({ subject, dept, sem }) => {
  return (
    <div>
      <Navbar />
      <div className="mainSection">
        <Herosection
          small
          dept={dept}
          sem={sem}
          title={
            subject == "All"
              ? subject + " Tasks & Assignments"
              : subject + " : Assignments"
          }
        />
      </div>
      <div className="task">
        {taskArray.map((item) => {
          if (subject == "All" || subject == item.subject)
            return (
              <Task
                itemTitle={item.itemTitle}
                titleNotes={item.titleNotes}
                subject={item.subject}
                dueDate={item.dueDate}
                timeOfposting={item.timeOfposting}
                profilePicOfPoster={item.profilePicOfPoster}
                status={item.status}
                taskFile={item.taskFile}
              />
              
            );
            
        })}
        <Sidebar />
      </div>
    </div>
  )
}

export default Tasks;

