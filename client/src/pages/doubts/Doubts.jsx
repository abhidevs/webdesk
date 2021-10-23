import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import { allDoubtsArray } from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";

const Doubts = ({ dept, sem }) => {
  const { subject } = useParams();

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="container">
        <HeroSection
          small
          dept={dept}
          sem={sem}
          title={
            subject === "all"
              ? subject + " Doubts & Questions"
              : subject + " : Doubts"
          }
        />

        {allDoubtsArray
          .filter((item) => subject === "all" || subject === item.subject)
          .map((item) => (
            <ItemLg
              type="doubt"
              itemTitle={item.itemTitle}
              postedBy={item.postedBy}
              subject={item.subject}
              timeOfposting={item.timeOfposting}
              profilePicOfPoster={item.profilePicOfPoster}
              votes={item.votes}
              doubtDesc={item.doubtDesc}
            />
          ))}
      </div>
    </div>
  );
};

export default Doubts;
