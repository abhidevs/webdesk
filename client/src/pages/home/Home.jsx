import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Herosection from "../../components/herosection/Herosection";
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
      <div className="container">
        <Herosection large title="Welcome To WebDesk" />

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

          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
