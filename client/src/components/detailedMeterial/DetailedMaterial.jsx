import React from "react";
import "./style.scss";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Add from "@material-ui/icons/Add";

const DetailedMaterial = ({
  type,
  title,
  postedBy,
  timeOfPosting,
  subject,
  filename,
}) => {
  return (
    <div className="detailed-material">
      <div className="material-info">
        <h1 className="title">{title}</h1>
        <div className="name-and-time">
          <h5>{postedBy}</h5>
          <h5 className="Postingtime">{timeOfPosting}</h5>
        </div>
        <h5 className="subject">{subject}</h5>

        <div className="filename">
          <DescriptionOutlinedIcon className="icon" />
          <h3>{filename}</h3>
        </div>
      </div>

      {type === "task" && (
        <div className="your-work">
          <div className="workinfo">
            <h3>Your Work</h3>
            <p>Assigned</p>
          </div>

          <button className="add-btn">
            <Add className="icon" />
            Add or Create
          </button>
          <button className="mark-btn">Mark as Done</button>
        </div>
      )}
    </div>
  );
};

export default DetailedMaterial;
