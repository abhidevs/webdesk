import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import CommentIcon from "@material-ui/icons/Comment";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SendIcon from "@material-ui/icons/Send";
import VideoChat from "../../components/videoChat/VideoChat";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import {io} from "socket.io-client";
import Peer from "simple-peer";
import { AuthContext } from "../../context/authContext/AuthContext";
import { FormControlLabel } from "@material-ui/core";

const Video = ({ peer, userVideo, videoRef }) => {
  const ref = useRef();

  useEffect(() => {
    if(!userVideo) {
      peer.on("stream", (stream) => {
        ref.current.srcObject = stream;
      });
    }
  }, []);

  return userVideo ? <video playsInline autoPlay ref={videoRef} /> : <video playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Onlinemeet = () => {
  const [peers, setPeers] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const {classId} = useParams();

  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const roomID = classId;
    console.log(roomID);
    socketRef.current = io("http://localhost:5000/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        console.log("initiated socket", roomID);
        socketRef.current.emit("join room", {roomID, username: user.fullname, userProfilePic: user.profilePic });
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(user.socketID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: user.socketID,
              peer,
            });
            peers.push({...user, peer});
          });

          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);

          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, {peer, ...payload.userInfo}]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("received message", (payload) => {
          setAllMessages((msgs) => [...msgs, payload.message]);
        });
      });
  }, []);

  console.log(peers, peersRef);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    
    const msgInfo = {
      message,
      type: "sent",
      senderName: user.fullname,
      senderProfilePic: user.profilePic,
      timeOfSending: new Date(),
    }
    
    setMessage("");
    setAllMessages((msgs) => [...msgs, {...msgInfo}]);
    // msgInfo.type = "received";

    peersRef.current.forEach((peer) => {
      socketRef.current.emit("sending message", {
        message: {...msgInfo, type: "received"},
        userToSignal: peer.peerID,
        senderID: "Abhik",
      });
    });

  };

  return (
    <div className="onlinemeet">
      <div className="wrapper">
        <div className="video-section">
          <Video userVideo muted videoRef={userVideo} autoPlay playsInline />

          <div className="controls">
            <button className="btn">
              <MicRoundedIcon />
            </button>
            <button className="btn">
              <VideocamRoundedIcon />
            </button>
            <button className="btn mobile-hide">
              <PresentToAllIcon />
            </button>
            <button className="btn mobile-hide">
              <CommentIcon />
            </button>
            <button className="btn mobile-hide">
              <SupervisorAccountIcon />
            </button>
            <button className="btn moreBtn">
              <MoreVertIcon />
            </button>
            <button className="leaveBtn">
              <CallEndIcon />
            </button>
          </div>
        </div>

        <div className="participants-section">
          <div className="heading">
            <SupervisorAccountIcon />
            (24) All Participants
          </div>

          <div className="participants">
            {peers.map(({username, peer}, index) => (
              <div className="participant">
                <Video key={index} peer={peer} />
                <p>{username.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-section">
          <div className="topSection">
            <p className="chatNavLink">chats</p>
            <p className="chatNavLink">participants</p>
            <p className="chatNavLink">info</p>
          </div>

          <div className="middleSection">
            <div className="chats">
              {allMessages?.map((m) => (
                <VideoChat
                  type={m.type}
                  senderName={m.senderName}
                  senderProfilePic={m.senderProfilePic}
                  message={m.message}
                  timeOfSending={m.timeOfSending}
                />
              ))}
            </div>
          </div>

          <form className="bottomSection" onSubmit={sendMessage}>
            <input type="text" placeholder="type message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button>
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Onlinemeet;
