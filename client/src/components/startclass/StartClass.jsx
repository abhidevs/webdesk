import React, { PureComponent } from "react";
import Navbar from "../navbar/Navbar";
import MicIcon from "@material-ui/icons/MicTwoTone";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import VideocamTwoToneIcon from "@material-ui/icons/VideocamTwoTone";
import "./Style.scss";

export default class StartClass extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="code">
            <h2>CFH-GGH-TYU</h2>
          </div>
          <div className="meeting">
            <div>
              {/* camera section  */}

              <div className="cam">
                <div className="images">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80g"
                    alt=""
                  />
                </div>
              </div>
              <div className="cam-icons">
                <button>
                  <MicIcon />
                </button>

                <button>
                  <VideocamTwoToneIcon />
                </button>

                <button>
                  <PersonalVideoIcon />
                </button>
              </div>
            </div>

            {/* join meeting section  */}

            <div className="join-meet">
              <h1>Join meeting ?</h1>
              <div className="btn1">
                <button>Ask to join meeting</button>
              </div>
              <h3>or</h3>
              <div className="btn2">
                <button>New meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
