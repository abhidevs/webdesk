import React from "react";
import "./style.scss";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ItemLg from "../itemLg/ItemLg";

const HomeWidget = ({ title, type, data }) => {
  return (
    <div className={"widget-container " + type}>
      <div className="topSection">
        <h2>{title}</h2>
        <a href="">
          see all
          <KeyboardArrowRightOutlinedIcon />
        </a>
      </div>

      {data.map((item, index) => (
        <ItemLg
          index={index}
          type={type === "notes" ? "note" : "task"}
          itemTitle={item.itemTitle}
          subject={item.subject}
          timeOfposting={item.timeOfposting}
          profilePicOfPoster={item.profilePicOfPoster}
          status={item.status}
          taskFile={item.taskFile}
        />
      ))}
    </div>
  );
};

export default HomeWidget;
