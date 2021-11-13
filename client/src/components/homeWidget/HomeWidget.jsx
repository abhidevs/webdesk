import React from "react";
import "./style.scss";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ItemMd from "../itemMd/ItemMd";
import ItemSm from "../itemSm/ItemSm";
import { Link } from "react-router-dom";

const HomeWidget = ({
  title,
  type,
  forLargeItems,
  forSmallItems,
  itemList,
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
        itemList?.map((item, index) => (
          <ItemMd type="class" key={item._id} index={index} data={item} />
        ))}

      {forLargeItems &&
        type !== "all-classes" &&
        itemList?.map((item, index) => (
          <ItemMd
            index={index}
            type={type.slice(0, -1)}
            key={item._id}
            data={item}
          />
        ))}

      {forSmallItems &&
        itemList?.map((item, index) => (
          <ItemSm
            index={index}
            type={type.slice(0, -1)}
            key={item._id}
            data={item}
            noLink={type === "schedules"}
          />
        ))}
    </div>
  );
};

export default HomeWidget;
