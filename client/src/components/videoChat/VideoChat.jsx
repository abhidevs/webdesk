import React from "react";
import "./style.scss";

const VideoChat = ({
  type,
  senderProfilePic,
  senderName,
  message,
  timeOfSending,
}) => {
  return (
    <div className={"videoChat " + type}>
      <div className="mainSection">
        <img src={senderProfilePic} alt="senderProfilePic" />

        <div className="textContent">
          <h5>{senderName}</h5>
          <p>{message}</p>
        </div>
      </div>
      <p className="time">{timeOfSending}</p>
    </div>
  );
};

export default VideoChat;
