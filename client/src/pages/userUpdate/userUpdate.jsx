import React, { useState } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
import SchoolRounded from "@material-ui/icons/SchoolRounded";
import MenuBookRounded from "@material-ui/icons/MenuBookRounded";
import Email from "@material-ui/icons/Email";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

function UserUpdate() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="user-page">
        <div className="userimg">
          <img
            src="https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div class="upload">
            <PhotoCamera className="cam" />
          </div>
        </div>

        <h2>Profile Update</h2>
        <div className="edit-user">
          <div className="user-input">
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
            ></input>
            <Person className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
            ></input>
            <Email className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="course"
              placeholder="Enter your course"
            ></input>
            <SchoolRounded className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="semester"
              placeholder="Enter your semester"
            ></input>
            <MenuBookRounded className="icon" />
          </div>

          <div className="user-input">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Enter old password"
            ></input>
            <Lock className="icon" />
          </div>

          <div className="user-input">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
            ></input>
            <Lock className="icon" />
          </div>

          <div className="user-input">
            <input
              type={passwordShown ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
            ></input>
            <Lock className="icon" />
          </div>
        </div>

        <div className="show-passwd">
          <Checkbox
            className="box"
            onClick={togglePassword}
            sx={{
              color: blue[800],
              "&.Mui-unchecked": {
                color: blue[800],
              },
            }}
          />
          <label>Show Password</label>
        </div>

        <div className="save-psswd">
          <button className="btn">save</button>
        </div>
      </div>
    </div>
  );
}
export default UserUpdate;
