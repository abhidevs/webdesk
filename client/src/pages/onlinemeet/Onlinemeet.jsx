import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import MicOffRoundedIcon from "@material-ui/icons/MicOffRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import VideocamOffRoundedIcon from "@material-ui/icons/VideocamOffRounded";
import PresentToAllRoundedIcon from "@material-ui/icons/PresentToAllRounded";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
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
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false)
  const socketRef = useRef();
  const userVideo = useRef();
  const screenCapture = useRef();
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

  const muteUnmuteAudio = () => {
    const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
    if(enabled) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
      setAudioEnabled(false);
    } else {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
      setAudioEnabled(true);
    }
  }

  const muteUnmuteVideo = () => {
    const enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    if(enabled) {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
      setVideoEnabled(false);
    } else {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
      setVideoEnabled(true);
    }
  }

  const toggleScreenSharing = async () => {
    if (!screenShareEnabled) {
      try {
        screenCapture.current = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenCapture.current.getTracks()[0].onended = switchBackToUserVideo;
        userVideo.current.srcObject = screenCapture.current;
        setScreenShareEnabled(true);

        peersRef.current.forEach(({peer}) => {
          peer.streams[0].getVideoTracks()[0].stop();
          console.log(peer.streams[0].getVideoTracks()[0], screenCapture.current.getVideoTracks()[0]);
          peer.replaceTrack(peer.streams[0].getVideoTracks()[0], screenCapture.current.getVideoTracks()[0], peer.streams[0]);
        })
      } catch (err) {
        console.error('error occured when trying to get screen sharing stream', err);
      }
    } else {
      screenCapture.current.getTracks().forEach(track => track.stop());
      switchBackToUserVideo();
    }
  };
  
  const switchBackToUserVideo = async () => {
    setScreenShareEnabled(false);
    userVideo.current.srcObject = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
    if(!audioEnabled) userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
    if(!videoEnabled) userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
    
    peersRef.current.forEach(({peer}) => {
      peer.streams[0].getVideoTracks()[0].stop();
      peer.replaceTrack(peer.streams[0].getVideoTracks()[0], userVideo.current.srcObject.getVideoTracks()[0], peer.streams[0]);
    })
  }

  return (
    <div className="onlinemeet">
      <div className="wrapper">
        <div className="video-section">
          <Video userVideo muted videoRef={userVideo} autoPlay playsInline />

          <div className="controls">
            <button className="btn" onClick={muteUnmuteAudio}>
              {audioEnabled ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
            </button>
            <button className="btn" onClick={muteUnmuteVideo}>
              { videoEnabled ? <VideocamRoundedIcon /> : <VideocamOffRoundedIcon />}
            </button>
            <button className="btn mobile-hide" onClick={toggleScreenSharing}>
              { screenShareEnabled ? <CancelPresentationRoundedIcon /> : <PresentToAllRoundedIcon />}
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
