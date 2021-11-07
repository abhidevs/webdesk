import React, { useEffect, useState } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeWidget from "../../components/homeWidget/HomeWidget";
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
            forLargeItems
          />
          <HomeWidget
            title="Tasks & Assignments"
            type="tasks"
            forLargeItems
          />
        </div>

        <div className="widgets-row">
          <HomeWidget
            title="Class Schedule"
            type="schedules"
            forSmallItems
            noSeeAll
          />
          <HomeWidget
            title="Doubts & Questions"
            type="doubts"
            forSmallItems
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
