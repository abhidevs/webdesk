import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import { materialArray } from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";

const Materials = ({ dept, sem }) => {
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
              ? subject + " Notes & Materials"
              : subject + " : Notes"
          }
        />

        {materialArray
          .filter((item) => subject === "all" || subject === item.subject)
          .map((item) => (
            <ItemLg
              type="material"
              itemTitle={item.itemTitle}
              postedBy={item.postedBy}
              subject={item.subject}
              timeOfposting={item.timeOfposting}
              profilePicOfPoster={item.profilePicOfPoster}
            />
          ))}
      </div>
    </div>
  );
};

export default Materials;
