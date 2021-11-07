import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { classesArray } from "../../dummydata";
import { getPosterProfile, getSubject } from "../../utils/fetchData";
import formatDatetime from "../../utils/formatDatetime";
import "./style.scss";

const ItemSm = ({
  type,
  index,
  data: { title, subjectId, posterId, createdAt, teacherIds, day, time },
  noLink,
}) => {
  const [subject, setSubject] = useState("");
  const [nameOfPoster, setNameOfPoster] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getSubject(subjectId).then((sub) => setSubject(sub?.name));

    if (type === "schedule") {
      getPosterProfile(teacherIds[0]).then((profile) =>
        setNameOfPoster(profile?.fullname)
      );
      setStatus(classesArray[index].status);
    } else {
      getPosterProfile(posterId).then((profile) =>
        setNameOfPoster(profile?.fullname)
      );
    }
  }, []);

  createdAt = formatDatetime(createdAt);
  day = "today";

  return (
    <>
      {noLink ? (
        <div
          className={
            "itemSm " + type + (type === "schedule" ? ` ${status}` : "")
          }
          onClick={
            status === "ongoing"
              ? () =>
                  (window.location.href = "http://localhost:3000/class/join")
              : () => {}
          }
        >
          <div className="column1">
            {type === "schedule" ? (
              <div className={"status-indicator " + status}></div>
            ) : (
              <p>{createdAt}</p>
            )}
            <h5>{type === "schedule" ? subject : nameOfPoster}</h5>
          </div>
          <div className="column2">
            <h5>{title}</h5>
            <p>{type === "schedule" ? nameOfPoster : subject}</p>
          </div>
          {type === "schedule" && (
            <div className="column3">
              <h5>{time}</h5>
              <p>{day}</p>
            </div>
          )}
          <div className="column4">
            {status === "ongoing" || type === "doubt" ? (
              <Link
                to={`/${type === "schedule" ? "class/join" : type}`}
                className="link"
              >
                <button>{type === "schedule" ? "Join" : "View"}</button>
              </Link>
            ) : (
              <p className={status}>{status?.replace("-", " ")}</p>
            )}
          </div>
        </div>
      ) : (
        <Link to={`/${type !== "schedule" ? type : "#"}`} className="link">
          <div
            className={
              "itemSm " + type + (type === "schedule" ? ` ${status}` : "")
            }
          >
            <div className="column1">
              {type === "schedule" ? (
                <div className={"status-indicator " + status}></div>
              ) : (
                <p>{createdAt}</p>
              )}
              <h5>{type === "schedule" ? subject : nameOfPoster}</h5>
            </div>
            <div className="column2">
              <h5>{title}</h5>
              <p>{type === "schedule" ? nameOfPoster : subject}</p>
            </div>
            {type === "schedule" && (
              <div className="column3">
                <h5>{time}</h5>
                <p>{day}</p>
              </div>
            )}
            <div className="column4">
              {status === "ongoing" || type === "doubt" ? (
                <Link
                  to={`/${type === "schedule" ? "class/join" : type}`}
                  className="link"
                >
                  <button>{type === "schedule" ? "Join" : "View"}</button>
                </Link>
              ) : (
                <p className={status}>{status?.replace("-", " ")}</p>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ItemSm;
