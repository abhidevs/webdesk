import React from "react";
import "./style.scss";

const ClassComment = ({
  classtype,
  type,
  postedBy,
  timeOfPosting,
  profilePic,
  message,
}) => {
  const userProfilePic =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  return (
    <div className="class-comment">
      <div className="commnet">
        <h3>{classtype}</h3>
      </div>
      {type === "writtenComment" ? (
        <div className="textContent">
          <div className="textContent-img">
            <img src={profilePic} alt="" />
          </div>
          <div className="text-message">
            <div className="topSection">
              <h5>{postedBy}</h5>
              <p>{timeOfPosting}</p>
            </div>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div className="inputSection">
          <div className="inputSection-image">
            <img src={userProfilePic} alt="" />
          </div>
          <input type="text" placeholder="Type comment" />
          <button>post</button>
        </div>
      )}
    </div>
  );
};

export default ClassComment;
