import React from "react";
import "./style.scss";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import formatDatetime from "../../utils/formatDatetime";

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
        <img src={senderProfilePic || dummyProfilePic} alt="senderProfilePic" />

        <div className="textContent">
          <h5>{senderName}</h5>
          <p>{message}</p>
        </div>
      </div>
      <p className="time">{formatDatetime(timeOfSending)}</p>
    </div>
  );
};

export default VideoChat;
