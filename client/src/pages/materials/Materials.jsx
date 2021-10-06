import React from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Herosection from "../../components/herosection/Herosection";
import { materialArray } from "../../dummydata";
import Sidebar from "../../components/sidebar/Sidebar";
import Material from "../../components/material/Material";


const Materials = ({ subject, dept, sem }) => {
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
              ? subject + " notes & materials"
              : subject + " : Notes"
          }
        />
      </div>
      <div className="materials">
        {materialArray.map((item) => {
          if (subject == "All" || subject == item.subject)
            return (
              <Material
                itemTitle={item.itemTitle}
                titleNotes={item.titleNotes}
                subject={item.subject}
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

export default Materials;

