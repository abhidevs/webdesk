import React, { useContext, useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeWidget from "../../components/homeWidget/HomeWidget";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/authContext/AuthContext";
import { MaterialsContext } from "../../context/materialsContext/MaterialsContext";
import { TasksContext } from "../../context/tasksContext/TasksContext";
import { SchedulesContext } from "../../context/schedulesContext/SchedulesContext";
import { DoubtsContext } from "../../context/doubtsContext/DoubtsContext";
import { getRecentMaterials } from "../../context/materialsContext/apiCalls";
import { getRecentTasks } from "../../context/tasksContext/apiCalls";
import { getRecentDoubts } from "../../context/doubtsContext/apiCalls";
import { getSchedules } from "../../context/schedulesContext/apiCalls";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { recentMaterials, dispatch: materialsDispatch } =
    useContext(MaterialsContext);
  const { recentTasks, dispatch: tasksDispatch } = useContext(TasksContext);
  const { schedules, dispatch: schedulesDispatch } =
    useContext(SchedulesContext);
  const { recentDoubts, dispatch: doubtsDispatch } = useContext(DoubtsContext);

  useEffect(() => {
    recentMaterials?.length < 2 && getRecentMaterials(user, materialsDispatch);
  }, [recentMaterials.length, materialsDispatch]);

  useEffect(() => {
    recentTasks?.length < 2 && getRecentTasks(user, tasksDispatch);
  }, [recentTasks.length, tasksDispatch]);

  useEffect(() => {
    schedules?.length < 3 && getSchedules(user, schedulesDispatch);
  }, [schedulesDispatch]);

  useEffect(() => {
    recentDoubts?.length < 3 && getRecentDoubts(user, doubtsDispatch);
  }, [recentDoubts.length, doubtsDispatch]);

  // console.log(recentMaterials, recentTasks, recentDoubts);
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="container">
        <HeroSection large title="Welcome to WebDesk" />

        <div className="widgets-row">
          <HomeWidget
            title="Notes & Materials"
            type="materials"
            forLargeItems
            itemList={recentMaterials}
          />
          <HomeWidget
            title="Tasks & Assignments"
            type="tasks"
            forLargeItems
            itemList={recentTasks}
          />
        </div>

        <div className="widgets-row">
          <HomeWidget
            title="Class Schedule"
            type="schedules"
            forSmallItems
            itemList={schedules}
            noSeeAll
          />
          <HomeWidget
            title="Doubts & Questions"
            type="doubts"
            forSmallItems
            itemList={recentDoubts}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
