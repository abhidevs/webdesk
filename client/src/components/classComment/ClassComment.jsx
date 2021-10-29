import React from "react";
import "./style.scss";
import SendIcon from "@material-ui/icons/Send";

const ClassComment = ({
  type,
  postedBy,
  timeOfPosting,
  profilePic,
  message,
}) => {
  const userProfilePic =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  return (
    <div className={"comment " + type}>
      <img
        src={type === "writtenComment" ? profilePic : userProfilePic}
        alt="profile"
      />

      {type === "writtenComment" ? (
        <div className="textContent">
          <div className="topSection">
            <h4>{postedBy}</h4>
            <p>{timeOfPosting}</p>
          </div>
          <p className="message">{message}</p>
        </div>
      ) : (
        <div className="inputSection">
          <input type="text" placeholder="Add class comment" />
          <button>
            <SendIcon className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassComment;
