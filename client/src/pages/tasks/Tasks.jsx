import React, { useContext, useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { TasksContext } from "../../context/tasksContext/TasksContext";
import { getAllTasks } from "../../context/tasksContext/apiCalls";
import formatDatetime from "../../utils/formatDatetime";

const Tasks = ({ dept, sem }) => {
  const { subject } = useParams();

  const { user } = useContext(AuthContext);
  const { allTasks, dispatch } = useContext(TasksContext);

  useEffect(() => {
    allTasks?.length === 0 && getAllTasks(user, dispatch);
  }, [dispatch]);

  console.log(allTasks);

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
        {allTasks
          ?.filter((item) => subject === "all" || subject === item.subject?.name)
          ?.map((item) => (
            <ItemLg
              type="task"
              itemTitle={item.title}
              postedBy={item.poster?.fullname}
              subject={item.subject?.name}
              timeOfposting={formatDatetime(item.createdAt)}
              profilePicOfPoster={item.poster?.profilePic}
              dueDate={formatDatetime(item.dueDatetime)}
              status={"pending"}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
