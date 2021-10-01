import React from "react";
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
    <div className={"itemSm " + type}>
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
          <p>tommorrow</p>
        </div>
      )}
      <div className="column4">
        {(status === "ongoing" || type === "doubt") ? (
          <button>Join</button>
        ) : (
          <p className={status}>{status?.replace("-", " ")}</p>
        )}
      </div>
    </div>
  );
};

export default ItemSm;
