import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { classesArray } from "../../dummydata";
import formatDatetime from "../../utils/formatDatetime";
import "./style.scss";

const ItemSm = ({ type, index, data, noLink }) => {
  let {
    _id: itemId,
    title,
    subject,
    poster,
    teachers,
    createdAt,
    day,
    time,
  } = data;

  const [status, setStatus] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (type === "schedule") setStatus(classesArray[index].status);
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
            status === "ongoing" ? () => history.push("/class/join/91c40469-3a0c-4672-8695-9274537e1bbd") : () => {}
          }
        >
          <div className="column1">
            {type === "schedule" ? (
              <div className={"status-indicator " + status}></div>
            ) : (
              <p>{createdAt}</p>
            )}
            <h5>{type === "schedule" ? subject?.name : poster?.fullname}</h5>
          </div>
          <div className="column2">
            <h5>{title}</h5>
            <p>{type === "schedule" ? teachers[0]?.fullname : subject?.name}</p>
          </div>
          {type === "schedule" && (
            <div className="column3">
              <h5>{time}</h5>
              <p>{day}</p>
            </div>
          )}
          <div className="column4">
            {status === "ongoing" ? (
              <Link
                to="class/join/91c40469-3a0c-4672-8695-9274537e1bbd"
                className="link"
              >
                <button>Join</button>
              </Link>
            ) : (
              <p className={status}>{status?.replace("-", " ")}</p>
            )}
          </div>
        </div>
      ) : (
        <Link
          to={{
            pathname: `/${type}/${itemId}`,
            itemData: data,
          }}
          className="link"
        >
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
              <h5>{type === "schedule" ? subject?.name : poster?.fullname}</h5>
            </div>
            <div className="column2">
              <h5>{title}</h5>
              <p>
                {type === "schedule" ? teachers[0]?.fullname : subject?.name}
              </p>
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
                  to={{
                    pathname: `/${type}/${itemId}`,
                    itemData: data,
                  }}
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
