import React from "react";
import "./style.scss";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ItemMd from "../itemMd/ItemMd";
import ItemSm from "../itemSm/ItemSm";
import { Link } from "react-router-dom";

const HomeWidget = ({
  title,
  type,
  data,
  forLargeItems,
  forSmallItems,
  noSeeAll,
}) => {
  return (
    <div className={"widget-container " + type}>
      <div className="topSection">
        <h2>{title}</h2>

        {!noSeeAll && (
          <Link
            to={`/${type === "schedules" ? "#classes" : type}/all`}
            className="link"
          >
            see all
            <KeyboardArrowRightOutlinedIcon />
          </Link>
        )}
      </div>

      {forLargeItems &&
        type === "all-classes" &&
        data.map((item) => (
          <ItemMd
            type="class"
            subject={item.subject}
            teacher={item.teacher}
            classTime={item.classTime}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))}

      {forLargeItems &&
        type !== "all-classes" &&
        data.map((item, index) => (
          <ItemMd
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

      {forSmallItems &&
        data.map((item) => (
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
