import React, { PureComponent } from "react";
import Navbar from "../../components/navbar/Navbar";
import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import PresentToAllRoundedIcon from "@material-ui/icons/PresentToAllRounded";
import "./style.scss";
import { Link } from "react-router-dom";

export default class StartClass extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <div className="startclass">
          {/* meeting section  */}
          <div className="meeting">
            <h3 className="meeting-code">xyz-ghq-tyu</h3>

            <div className="meeting-screen">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80g"
                alt="profileimg"
              />
            </div>

            <div className="meeting-controls">
              <button>
                <MicNoneRoundedIcon className="icon" />
              </button>
              <button>
                <VideocamOutlinedIcon className="icon" />
              </button>
              <button>
                <PresentToAllRoundedIcon className="icon" />
              </button>
            </div>
          </div>

          {/* join meeting section  */}
          <div className="join-meeting">
            <h1>Join meeting ?</h1>

            <Link to="/class">
              <button>Ask to join</button>
            </Link>

            <h3>or</h3>

            <Link to="/class/create">
              <button>New meeting</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
