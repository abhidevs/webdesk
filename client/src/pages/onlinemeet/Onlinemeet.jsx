import React from "react";
import "./style.scss";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import CommentIcon from "@material-ui/icons/Comment";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SendIcon from "@material-ui/icons/Send";
import VideoChat from "../../components/videoChat/VideoChat";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Onlinemeet = () => {
  return (
    <div className="onlinemeet">
      <div className="wrapper">
        <div className="video-section">
          <img
            className="display-image"
            src="https://static.acer.com/up/Resource/Acer/windows-11/20210622/WIN_Start_Productivity_Light_16x9_en-US.jpg"
            alt="present screen"
          />

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
            <div className="participant">
              <img src={image1} alt="image1" />
              <p>You</p>
            </div>
            <div className="participant">
              <img src={image2} alt="image1" />
              <p>Rabbil</p>
            </div>
            <div className="participant">
              <img src={image3} alt="image1" />
              <p>Bisu</p>
            </div>
            <div className="participant">
              <img src={image1} alt="image1" />
              <p>Soumen</p>
            </div>
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
              <VideoChat
                type="received"
                senderName="Soumen Jana"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="Good morning all"
                timeOfSending="9:31 am"
              />
              <VideoChat
                type="received"
                senderName="Abhik Das"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="Morning guys"
                timeOfSending="9:31 am"
              />
              <VideoChat
                type="sent"
                senderName="Soumen Sau"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="Good morning😃"
                timeOfSending="9:31 am"
              />
              <VideoChat
                type="received"
                senderName="Rabbil Khan"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="How are you doing everyone?"
                timeOfSending="9:32 am"
              />
              <VideoChat
                type="sent"
                senderName="Soumen Sau"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="I'm fine."
                timeOfSending="9:32 am"
              />
              <VideoChat
                type="received"
                senderName="Biswanath Bera"
                senderProfilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKLhhPTTq_dJ5Hf7w4jMZlst9-UfadOVhSgxI8ftfyhsxlpjWNeRAV0q996Y6_YCdHnE&usqp=CAU"
                message="All good😎"
                timeOfSending="9:33 am"
              />
            </div>
          </div>

          <div className="bottomSection">
            <input type="text" placeholder="type message" />
            <button>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Onlinemeet;
