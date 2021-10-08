import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ItemLg = ({
  index,
  type,
  itemTitle,
  postedBy,
  subject,
  timeOfposting,
  profilePicOfPoster,
  status,
  dueDate,
}) => {
  return (
    <div className={"itemLg " + type + (index === 0 ? " first" : " second")}>
      <div className="topSection">
        <Link to={`/${type}s/${subject}`} className="link">
          <h4 className="subject">{subject}</h4>
        </Link>
        {type === "task" && (
          <p className={"dueDate " + status}>
            {status === "submitted" ? status : dueDate}
          </p>
        )}
      </div>

      <div className="bottomSection">
        <img src={profilePicOfPoster} alt="profile" />
        <div className="textContent">
          <h4 className="itemTitle">
            {postedBy +
              (type === "task" ? " assigned " : " shared ") +
              itemTitle}
          </h4>
          <p>{timeOfposting}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemLg;
