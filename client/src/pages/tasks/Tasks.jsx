import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import { taskArray } from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";

const Tasks = ({ dept, sem }) => {
  const { subject } = useParams();

  return (
    <div className="container">
      <Navbar />
      <Sidebar />

      <HeroSection
        small
        dept={dept}
        sem={sem}
        title={
          subject === "all"
            ? subject + " Tasks & Assignments"
            : subject + " : Assignments"
        }
      />

      <div className="tasks">
        {taskArray
          .filter((item) => subject === "all" || subject === item.subject)
          .map((item) => (
            <ItemLg
              type="task"
              itemTitle={item.itemTitle}
              postedBy={item.postedBy}
              subject={item.subject}
              timeOfposting={item.timeOfposting}
              profilePicOfPoster={item.profilePicOfPoster}
              dueDate={item.dueDate}
              status={item.status}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
