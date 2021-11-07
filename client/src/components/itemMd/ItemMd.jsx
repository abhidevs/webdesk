import React, { useEffect, useState } from "react";
import axios from "axios";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { Link } from "react-router-dom";
import "./style.scss";
import { getPosterProfile, getSubject } from "../../utils/fetchData";
import formatDatetime from "../../utils/formatDatetime";

const ItemMd = ({
  index,
  type,
  status = "pending",
  classTime = "9:30 am",
  data: {
    title,
    subjectId,
    posterId,
    attachments,
    submissions,
    createdAt,
    dueDatetime,
    name,
    teacherIds,
  },
  bgColor,
  textColor,
}) => {
  const [subject, setSubject] = useState("");
  const [posterProfilePic, setPosterProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
  );
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    if (type === "class") {
      setSubject(name);
      getPosterProfile(teacherIds[0]).then((profile) =>
        setTeacherName(profile?.fullname)
      );
    } else {
      getSubject(subjectId).then((sub) => setSubject(sub?.name));
      getPosterProfile(posterId).then((profile) =>
        setPosterProfilePic(profile?.profilePic)
      );
    }
  }, []);

  createdAt = formatDatetime(createdAt);
  dueDatetime && formatDatetime(dueDatetime);

  return (
    <>
      {type === "class" ? (
        <div className={"itemMd " + type}>
          <div className="subject-icon" style={{ background: bgColor }}>
            <h5 style={{ color: textColor }}>{subject?.charAt(0)}</h5>
          </div>

          <div className="textcontent">
            <h4 className="itemTitle">{subject}</h4>
            <h4 className="subject">{teacherName}</h4>
            <p>{classTime}</p>
          </div>

          <div className="right">
            <Link to={`/materials/${subject}`} className="link">
              <button>Notes</button>
            </Link>
            <Link to={`/tasks/${subject}`} className="link">
              <button>Tasks</button>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={"itemMd " + type + (index === 0 ? " first" : " second")}
        >
          <img src={posterProfilePic} alt="profileimage" />

          <div className="textcontent">
            <h4 className="itemTitle">{type === "task" ? subject : title}</h4>
            <h4 className="subject">{type === "task" ? title : subject}</h4>
            {type === "task" ? (
              <div className="taskfile">
                <DescriptionOutlinedIcon className="icon" />
                <p>{attachments[0]}</p>
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
