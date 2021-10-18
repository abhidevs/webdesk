import React from "react";
import "./style.scss";
import { Send } from "@material-ui/icons";

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
      <div className="comment-heading">
        <h3>{classtype}</h3>
      </div>

      {type === "writtenComment" ? (
        <div className="comment">
          <img src={profilePic} alt="profile" />

          <div className="textContent">
            <div className="topSection">
              <h4>{postedBy}</h4>
              <p>{timeOfPosting}</p>
            </div>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div className="writeComment">
          <img src={userProfilePic} alt="profile" />

          <div className="inputSection">
            <input type="text" placeholder="Add class comment" />
            <button>
              <Send className="icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassComment;
