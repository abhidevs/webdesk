import React, { useEffect, useState } from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { Link } from "react-router-dom";
import "./style.scss";
import formatDatetime from "../../utils/formatDatetime";
import { allClassesArray } from "../../dummydata";

const ItemMd = ({
  index,
  type,
  status = "pending",
  classTime = "9:30 am",
  data: {
    title,
    subject,
    poster,
    attachments,
    submissions,
    createdAt,
    dueDatetime,
    teachers,
    name: subjectName,
  },
}) => {
  const dummyProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (type === "class") {
      setBgColor(allClassesArray[index]?.bgColor);
      setTextColor(allClassesArray[index]?.textColor);
    }
  }, []);

  createdAt = formatDatetime(createdAt);
  dueDatetime && formatDatetime(dueDatetime);

  return (
    <>
      {type === "class" ? (
        <div className={"itemMd " + type}>
          <div className="subject-icon" style={{ background: bgColor }}>
            <h5 style={{ color: textColor }}>{subjectName?.charAt(0)}</h5>
          </div>

          <div className="textcontent">
            <h4 className="itemTitle">{subjectName}</h4>
            <h4 className="subject">{teachers[0]?.fullname}</h4>
            <p>{classTime}</p>
          </div>

          <div className="right">
            <Link to={`/materials/${subjectName}`} className="link">
              <button>Notes</button>
            </Link>
            <Link to={`/tasks/${subjectName}`} className="link">
              <button>Tasks</button>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={"itemMd " + type + (index === 0 ? " first" : " second")}
        >
          <img src={poster.profilePic || dummyProfilePic} alt="profileimage" />

          <div className="textcontent">
            <h4 className="itemTitle">
              {type === "task" ? subject?.name : title}
            </h4>
            <h4 className="subject">
              {type === "task" ? title : subject?.name}
            </h4>
            {type === "task" ? (
              <div className="taskfile">
                <DescriptionOutlinedIcon className="icon" />
                <p>{attachments[0]?.filename}</p>
              </div>
            ) : (
              <p>{createdAt}</p>
            )}
          </div>

          <div className={"right " + status}>
            {type === "task" && (
              <>
                <p>{status === "pending" ? createdAt : status}</p>
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

export default ItemMd;
