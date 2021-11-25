import React, { useEffect, useRef, useState } from "react";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import KeyboardRoundedIcon from "@material-ui/icons/KeyboardRounded";
import Navbar from "../../components/navbar/Navbar";
import meetingImg from "../../assets/meeting.svg";
import "./style.scss";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const CreateClass = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const joinWithCode = useRef(null);
  const joinBtn = useRef(null);
  const history = useHistory();

  const showHideJoinBtn = () => {
    if (!meetingCode) {
      joinWithCode.current?.classList?.toggle("show-joinBtn");
    }
  };

  useEffect(() => {
    if (meetingCode) {
      joinBtn.current?.classList?.remove("disabled");
    }

    if (!meetingCode) {
      joinBtn.current?.classList?.add("disabled");
    }
  }, [meetingCode]);

  const handleJoinWithCode = () => {
    if (meetingCode) {
      window.location.href = `http://localhost:3000/class/${meetingCode}`;
    }
  };

  const handleCreateMeeting = (e) => {
    const newClassId = uuid();
    console.log(newClassId);
    history.push(`/class/${newClassId}`)
  }

  return (
    <div>
      <Navbar />
      <div className="createClass">
        <div className="left">
          <div className="textContent">
            <h1>Create free live classes</h1>
            <h1>or group discussions.</h1>
            <p>Click New meeting to start new meeting,</p>
            <p>or enter meeting code or link to Join.</p>
          </div>

          <div className="btn-container">
            <button className="createBtn" onClick={handleCreateMeeting}>
              <VideoCallOutlinedIcon className="icon" /> New meeting
            </button>

            <div className="joinWithCode" id="joinWithCode" ref={joinWithCode}>
              <div className="code-input">
                <KeyboardRoundedIcon className="icon" />
                <input
                  type="text"
                  placeholder="Enter a code or link"
                  onChange={(e) => setMeetingCode(e.target.value)}
                  onFocus={showHideJoinBtn}
                  onBlur={showHideJoinBtn}
                />
              </div>

              <button
                className="joinBtn disabled"
                ref={joinBtn}
                onClick={handleJoinWithCode}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="right">
          <img src={meetingImg} alt="profileimg" />
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
