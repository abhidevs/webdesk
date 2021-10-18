import { Add } from "@material-ui/icons";
import React from "react";
import "./style.scss";
const YourWork = ({
  title,
  specify,
  create,
  marked
}) => {
  

  return (
    <div className="your-work">
      <div className="submit-work">
        <div className="workinfo">
          <h3>{title} </h3>
          <p>{specify}</p>
        </div>
        <div className="add-btn">
          
          <button><Add/>{create}</button>
        </div>
        <div className="mark-btn">
          <button>{marked}</button>
        </div>
      </div>
    </div>
  );
};
export default YourWork;
