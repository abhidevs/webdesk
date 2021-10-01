import React from "react";
import "./style.scss";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ItemLg from "../itemLg/ItemLg";
import ItemSm from "../itemSm/ItemSm";

const HomeWidget = ({ title, type, data, forLargeItems, forSmallItems }) => {
  return (
    <div className={"widget-container " + type}>
      <div className="topSection">
        <h2>{title}</h2>
        <a href="">
          see all
          <KeyboardArrowRightOutlinedIcon />
        </a>
      </div>

      { forLargeItems && data.map((item, index) => (
        <ItemLg
          index={index}
          type={type.slice(0, -1)}
          itemTitle={item.itemTitle}
          subject={item.subject}
          timeOfposting={item.timeOfposting}
          profilePicOfPoster={item.profilePicOfPoster}
          status={item.status}
          taskFile={item.taskFile}
        />
      ))}

      { forSmallItems && data.map((item) => (
        <ItemSm
          type={type.slice(0, -1)}
          itemTitle={item.itemTitle}
          subject={item.subject}
          timeOfposting={item.timeOfposting}
          nameOfPoster={item.nameOfPoster}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default HomeWidget;
