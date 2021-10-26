import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeWidget from "../../components/homeWidget/HomeWidget";
import {
  classesArray,
  doubtsArray,
  notesArray,
  tasksArray,
} from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
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
            data={notesArray}
            forLargeItems
          />
          <HomeWidget
            title="Tasks & Assignments"
            type="tasks"
            data={tasksArray}
            forLargeItems
          />
        </div>

        <div className="widgets-row">
          <HomeWidget
            title="Class Schedule"
            type="schedules"
            data={classesArray}
            forSmallItems
          />
          <HomeWidget
            title="Doubts & Questions"
            type="doubts"
            data={doubtsArray}
            forSmallItems
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
