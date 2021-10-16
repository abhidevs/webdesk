import React from "react";
import "./style.scss";
import presentscreen from "../../assets/presentscreen.jpg";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import VideocamIcon from "@material-ui/icons/Videocam";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MicIcon from "@material-ui/icons/Mic";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import TextsmsIcon from "@material-ui/icons/Textsms";
import SendIcon from "@material-ui/icons/Send";
import Textsection from "../../components/textsection/Textsection";
const Classmeet = () => {
  return (
    <div className="vdframe">
      <div className="video-section">
        <img
          className="display-image"
          src={presentscreen}
          alt="presentscreen"
        />

        <div className="footer">
         <div className="icon-style">
           <button className="btn1">
            <VideocamIcon />
            </button>
           
            <button className="btn1">  <MicIcon/> </button>

            <button className="btn1">
            <PresentToAllIcon/> </button>

            <button className=" btn1"> <TextsmsIcon/></button>
            <button className=" btn1"> <SupervisorAccountIcon/></button>
            </div>
        <button className="btn">leave meeting</button>
        </div>
      </div>


      <div className="parti">
      <SupervisorAccountIcon/>
      </div>
      <div className="top-section">(24)All Participants</div>

      <div className="participants-screen">
        <img className="side-image" src={image1} alt="image1" />
        <p>you</p>
        <img className="side-image" src={image2} alt="image2" />
        <p>Rabbil</p>
        <img className="side-image" src={image3} alt="image3" />
        <p>soumen</p>
        <img className="side-image" src={image1} alt="image1" />
        <p>abhik</p>
        <img className="side-image" src={image2} alt="image2" />
        <p>taliban</p>
      </div>
      {/* side bar  */}

      <div className="sidebar">
        <div className="topbar">
          <li className="chats">Chats</li>
          <li className="participants">Participants</li>
          <li className="info">info</li>
        </div>
        <hr />
        <form action="">
        <input type="text" placeholder="type message" />
      <button className="s-icon">  <SendIcon/></button></form>
      </div>
      <Textsection/>
    </div>
  );
};
export default Classmeet;
export {Textsection};
