import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import "./style.scss";
import { Link } from "react-router-dom";

const Material = ({
  index,
  type,
  itemTitle,
  titleNotes,
  subject,
  timeOfposting,
  profilePicOfPoster,
  taskFile,
  status,
}) => {
  return (
    <div className={"itemLg2 " + type + (index === 0 ? " first" : " second")}>
      <img src={profilePicOfPoster} alt="profileimage" />
      <div className="textcontent">
        {<h4 className="subject">{type === "task" ? itemTitle : subject}</h4>}
        <h4 className="itemTitle">{type === "task" ? subject : titleNotes + itemTitle}</h4>
        {type === "task" ? (
          <div className="taskfile">
            <DescriptionOutlinedIcon className="icon" />
            <p>{taskFile}</p>
          </div>
        ) : (
          <p>{timeOfposting}</p>
        )}
      </div>
    </div>
  );
};

export default Material;
