import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import "./style.scss";
import { Link } from "react-router-dom";

const ItemLg = ({
  index,
  type,
  itemTitle,
  subject,
  timeOfposting,
  profilePicOfPoster,
  taskFile,
  status,
}) => {
  return (
    <div className={"itemLg " + type + (index === 0 ? " first" : " second")}>
      <img src={profilePicOfPoster} alt="profileimage" />

      <div className="textcontent">
        <h4 className="itemTitle">{type === "task" ? subject : itemTitle}</h4>
        <h4 className="subject">{type === "task" ? itemTitle : subject}</h4>
        {type === "task" ? (
          <div className="taskfile">
            <DescriptionOutlinedIcon className="icon" />
            <p>{taskFile}</p>
          </div>
        ) : (
          <p>{timeOfposting}</p>
        )}
      </div>

      <div className={"right " + status}>
        {type === "task" && (
          <>
            <p>{status === "pending" ? timeOfposting : status}</p>
          </>
        )}
        {(type === "material" || status === "pending") && (
          <Link to={`/${type}`} className="link">
            <button>View</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemLg;
