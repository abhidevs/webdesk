import React from "react";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import "./style.scss";

const ItemLg = ({
  type,
  itemTitle,
  postedBy,
  subject,
  timeOfposting,
  profilePicOfPoster,
  status,
  dueDate,
  votes,
  doubtDesc,
}) => {
  return (
    <div className={"itemLg " + type}>
      {type === "doubt" && (
        <div className="votes">
          <ArrowUpwardRoundedIcon className="icon" />
          <p>{votes}</p>
          <ArrowDownwardRoundedIcon className="icon" />
        </div>
      )}

      <div className="itemContent">
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
            <div className="titleSection">
              <h4 className="itemTitle">
                {postedBy +
                  (type === "material" ? " shared " : (type === "task" ? " assigned " : " asked ")) +
                  itemTitle}
              </h4>
              <p>{timeOfposting}</p>
            </div>

            {type === "doubt" && <p className="doubtDesc">{doubtDesc}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemLg;
