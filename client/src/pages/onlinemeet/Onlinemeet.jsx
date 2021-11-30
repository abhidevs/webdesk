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
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import VideoChat from "../../components/videoChat/VideoChat";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { AuthContext } from "../../context/authContext/AuthContext";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import {
  Button,
  IconButton,
  Slide,
  Dialog,
  DialogActions,
  makeStyles,
} from "@material-ui/core";

const Video = ({ peer, userVideo, videoRef }) => {
  const ref = useRef();

  useEffect(() => {
    if (!userVideo) {
      peer.on("stream", (stream) => {
        ref.current.srcObject = stream;
      });
    }
  }, []);

  return userVideo ? (
    <video playsInline autoPlay ref={videoRef} />
  ) : (
    <video playsInline autoPlay ref={ref} />
  );
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let DialogBtnStyle = {
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "var(--secondary-color)",
  border: "none",
  borderRadius: "50px",
  boxShadow: "2px 2px 20px #d1d1d1",
  color: "var(--text-color2)",
  margin: "10px",
};

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: "flex-end",
  },
  topPaperScrollBody: {
    verticalAlign: "bottom",
  },
});

const Onlinemeet = () => {
  const [peers, setPeers] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [activeRightPanelTab, setActiveRightPanelTab] = useState("chats");
  const [moreControlsOpened, setMoreControlsOpened] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const screenCapture = useRef();
  const peersRef = useRef([]);
  const { classId } = useParams();
  const history = useHistory();

  const { user } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    const roomID = classId;
    socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER_URL);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        console.log("initiated socket", roomID);
        socketRef.current.emit("join room", {
          roomID,
          username: user.fullname,
          userProfilePic: user.profilePic,
        });
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(
              user.socketID,
              socketRef.current.id,
              stream
            );
            peersRef.current.push({
              peerID: user.socketID,
              peer,
            });
            peers.push({ ...user, peer });
          });

          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);

          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, { peer, ...payload.userInfo }]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("received message", (payload) => {
          setAllMessages((msgs) => [...msgs, payload.message]);
        });

        socketRef.current.on("user left", (socketID) => {
          const peerToRemove = peersRef.current.find(
            (p) => p.peerID === socketID
          );
          if (peerToRemove) peerToRemove.peer.destroy();

          const updatedPeersRef = peersRef.current.filter(
            (p) => p.peerID !== socketID
          );
          peersRef.current = updatedPeersRef;

          setPeers((currentArr) => [
            ...currentArr.filter((p) => p.socketID !== socketID),
          ]);
        });
      });

    document.getElementById(activeRightPanelTab).classList.add("active");
  }, []);

  console.log(peers, peersRef);

  const changeactiveRightPanelTab = (e, tab) => {
    document.getElementById(activeRightPanelTab).classList.remove("active");
    let currentActive;
    if (e) currentActive = e.currentTarget.id;
    else currentActive = tab;
    setActiveRightPanelTab(currentActive);
    document.getElementById(currentActive).classList.add("active");
  };

  const openFullScreenRightPanel = (tab) => {
    changeactiveRightPanelTab(null, tab);
    document.getElementById("rightPanel").classList.add("fullscreen");
  };

  const closeFullScreenRightPanel = () => {
    document.getElementById("rightPanel").classList.remove("fullscreen");
  };

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
    };

    setMessage("");
    setAllMessages((msgs) => [...msgs, { ...msgInfo }]);
    // msgInfo.type = "received";

    peersRef.current.forEach((peer) => {
      socketRef.current.emit("sending message", {
        message: { ...msgInfo, type: "received" },
        userToSignal: peer.peerID,
        senderID: "Abhik",
      });
    });
  };

  const muteUnmuteAudio = () => {
    const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
    if (enabled) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
      setAudioEnabled(false);
    } else {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
      setAudioEnabled(true);
    }
  };

  const muteUnmuteVideo = () => {
    const enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    if (enabled) {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
      setVideoEnabled(false);
    } else {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
      setVideoEnabled(true);
    }
  };

  const toggleScreenSharing = async () => {
    if (!screenShareEnabled) {
      try {
        screenCapture.current = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenCapture.current.getTracks()[0].onended = switchBackToUserVideo;
        userVideo.current.srcObject = screenCapture.current;
        setScreenShareEnabled(true);

        peersRef.current.forEach(({ peer }) => {
          peer.streams[0].getVideoTracks()[0].stop();
          peer.replaceTrack(
            peer.streams[0].getVideoTracks()[0],
            screenCapture.current.getVideoTracks()[0],
            peer.streams[0]
          );
        });
      } catch (err) {
        console.error(
          "error occured when trying to get screen sharing stream",
          err
        );
      }
    } else {
      screenCapture.current.getTracks().forEach((track) => track.stop());
      switchBackToUserVideo();
    }
  };

  const switchBackToUserVideo = async () => {
    setScreenShareEnabled(false);
    userVideo.current.srcObject = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: true,
    });
    if (!audioEnabled)
      userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
    if (!videoEnabled)
      userVideo.current.srcObject.getVideoTracks()[0].enabled = false;

    peersRef.current.forEach(({ peer }) => {
      peer.streams[0].getVideoTracks()[0].stop();
      peer.replaceTrack(
        peer.streams[0].getVideoTracks()[0],
        userVideo.current.srcObject.getVideoTracks()[0],
        peer.streams[0]
      );
    });
  };

  const leaveMeeting = () => {
    socketRef.current.disconnect();
    userVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    history.push("/createclass");
  };

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
              {videoEnabled ? (
                <VideocamRoundedIcon />
              ) : (
                <VideocamOffRoundedIcon />
              )}
            </button>
            <button className="btn mobile-hide" onClick={toggleScreenSharing}>
              {screenShareEnabled ? (
                <CancelPresentationRoundedIcon />
              ) : (
                <PresentToAllRoundedIcon />
              )}
            </button>
            <button
              className="btn mobile-hide"
              onClick={() => changeactiveRightPanelTab(null, "chats")}
            >
              <CommentIcon />
            </button>
            <button
              className="btn mobile-hide"
              onClick={() => changeactiveRightPanelTab(null, "participants")}
            >
              <SupervisorAccountIcon />
            </button>
            <button
              className="btn moreBtn"
              onClick={() => setMoreControlsOpened(true)}
            >
              <MoreVertIcon />
            </button>
            <button className="leaveBtn" onClick={leaveMeeting}>
              <CallEndIcon />
            </button>

            <Dialog
              open={moreControlsOpened}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setMoreControlsOpened(false)}
              aria-describedby="more options"
              classes={{
                scrollPaper: classes.topScrollPaper,
                paperScrollBody: classes.topPaperScrollBody,
              }}
            >
              <DialogActions>
                <button
                  style={DialogBtnStyle}
                  onClick={() => {
                    setMoreControlsOpened(false);
                    toggleScreenSharing();
                  }}
                >
                  {screenShareEnabled ? (
                    <CancelPresentationRoundedIcon />
                  ) : (
                    <PresentToAllRoundedIcon />
                  )}
                </button>
                <button
                  style={DialogBtnStyle}
                  onClick={() => {
                    setMoreControlsOpened(false);
                    openFullScreenRightPanel("chats");
                  }}
                >
                  <CommentIcon />
                </button>
                <button
                  style={DialogBtnStyle}
                  onClick={() => {
                    setMoreControlsOpened(false);
                    openFullScreenRightPanel("participants");
                  }}
                >
                  <SupervisorAccountIcon />
                </button>
                <button
                  style={DialogBtnStyle}
                  onClick={(e) => {
                    setMoreControlsOpened(false);
                    openFullScreenRightPanel("info");
                  }}
                >
                  <InfoOutlinedIcon />
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className="screens-section">
          <div className="heading">
            <SupervisorAccountIcon />({peers.length}) All Screens
          </div>

          <div className="screens">
            {peers.map(({ username, socketID, peer }) => (
              <div className="screen">
                <Video key={socketID} peer={peer} />
                <p>{username.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel" id="rightPanel">
          <div className="topSection">
            <button className="backBtn" onClick={closeFullScreenRightPanel}>
              <ArrowBackRoundedIcon className="icon" />
            </button>

            <p
              className="rightNavLink"
              id="chats"
              onClick={changeactiveRightPanelTab}
            >
              chats
            </p>
            <p
              className="rightNavLink"
              id="participants"
              onClick={changeactiveRightPanelTab}
            >
              participants
            </p>
            <p
              className="rightNavLink"
              id="info"
              onClick={changeactiveRightPanelTab}
            >
              info
            </p>
          </div>

          <div className="middleSection">
            {activeRightPanelTab === "participants" && (
              <div className="participants">
                <div className="participant">
                  <img
                    src={user.profilePic || dummyProfilePic}
                    alt="user profile"
                  />
                  <h6>{user.fullname} (You)</h6>
                  <IconButton>
                    <MoreHorizRoundedIcon />
                  </IconButton>
                </div>

                {peers?.map((p) => (
                  <div className="participant">
                    <img
                      src={p.userProfilePic || dummyProfilePic}
                      alt="user profile"
                    />
                    <h6>{p.username}</h6>
                    <IconButton>
                      <MoreHorizRoundedIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}

            {activeRightPanelTab === "chats" && (
              <>
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
                <form className="msgForm" onSubmit={sendMessage}>
                  <input
                    type="text"
                    placeholder="type message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button disabled={!message.length}>
                    <SendIcon />
                  </button>
                </form>
              </>
            )}

            {activeRightPanelTab === "info" && (
              <div className="meeting-info">
                <h6>Joining info</h6>
                <p>{window.location.href}</p>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<ContentCopyRoundedIcon />}
                  style={{ textTransform: "none" }}
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  Copy joining info
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Onlinemeet;
