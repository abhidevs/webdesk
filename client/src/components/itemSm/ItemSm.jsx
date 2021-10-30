import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ItemSm = ({
  type,
  itemTitle,
  subject,
  timeOfposting,
  nameOfPoster,
  status,
}) => {
  return (
    <Link
      to={`/${
        type === "schedule" ? (status === "ongoing" ? "class/join" : "#") : type
      }`}
      className="link"
    >
      <div
        className={"itemSm " + type + (type === "schedule" ? ` ${status}` : "")}
      >
        <div className="column1">
          {type === "schedule" ? (
            <div className={"status-indicator " + status}></div>
          ) : (
            <p>{timeOfposting}</p>
          )}
          <h5>{type === "schedule" ? subject : nameOfPoster}</h5>
        </div>
        <div className="column2">
          <h5>{itemTitle}</h5>
          <p>{type === "schedule" ? nameOfPoster : subject}</p>
        </div>
        {type === "schedule" && (
          <div className="column3">
            <h5>{timeOfposting}</h5>
            <p>today</p>
          </div>
        )}
        <div className="column4">
          {status === "ongoing" || type === "doubt" ? (
            <Link to={`/${type === "schedule" ? "class/join" : type}`} className="link">
              <button>{type === "schedule" ? "Join" : "View"}</button>
            </Link>
          ) : (
            <p className={status}>{status?.replace("-", " ")}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemSm;
