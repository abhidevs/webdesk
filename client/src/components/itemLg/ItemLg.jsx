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
  teacher,
  classTime,
  bgColor,
  textColor,
}) => {
  return (
    <>
      {type === "class" ? (
        <div className={"itemLg " + type}>
          <div className="subject-icon" style={{ background: bgColor }}>
            <h5 style={{ color: textColor }}>{subject.charAt(0)}</h5>
          </div>

          <div className="textcontent">
            <h4 className="itemTitle">{subject}</h4>
            <h4 className="subject">{teacher}</h4>
            <p>{classTime}</p>
          </div>

          <div className="right">
            <Link to={`/materials/`} className="link">
              <button>Notes</button>
            </Link>
            <Link to={`tasks`} className="link">
              <button>Tasks</button>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={"itemLg " + type + (index === 0 ? " first" : " second")}
        >
          <img src={profilePicOfPoster} alt="profileimage" />

          <div className="textcontent">
            <h4 className="itemTitle">
              {type === "task" ? subject : itemTitle}
            </h4>
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
      )}
    </>
  );
};

export default ItemLg;
