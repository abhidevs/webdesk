import React, { useContext, useState } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import SchoolRounded from "@material-ui/icons/SchoolRounded";
import MenuBookRounded from "@material-ui/icons/MenuBookRounded";
import { AuthContext } from "../../context/authContext/AuthContext";
import { registerUser } from "../../context/authContext/apiCalls";
import background from "../../assets/Wave.png";
import sideimage from "../../assets/reg-side-img.svg";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");

  const { isFetching, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const handleRegister = () => {
    if (!(fullname && email && password && course && semester)) {
      alert("Please fillup all fields");
    } else if (password !== confirmPass) {
      alert("Password & confirm password are not equal");
    } else {
      registerUser({ fullname, email, password, course, semester }, dispatch);
    }
  };

  return (
      <div className="register">
        <div className="register-page">
          <h1>Register</h1>
          <div className="register-input">
            <input
              type="text"
              name="fullname"
              value={fullname}
              placeholder="Your full name"
              onChange={(e) => setFullname(e.target.value)}
            ></input>
            <Person className="icon" />
          </div>
          <div className="register-input">
            <input
              type="text"
              name="course"
              value={course}
              placeholder="Your course"
              onChange={(e) => setCourse(e.target.value)}
            ></input>
            <SchoolRounded className="icon" />
          </div>
          <div className="register-input">
            <input
              type="text"
              name="semester"
              value={semester}
              placeholder="Your semester"
              onChange={(e) => setSemester(e.target.value)}
            ></input>
            <MenuBookRounded className="icon" />
          </div>
          <div className="register-input">
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <Email className="icon" />
          </div>
          <div className="register-input">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <Lock className="icon" />
          </div>
          <div className="register-input">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPass}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPass(e.target.value)}
            ></input>
            <Lock className="icon" />
          </div>
          <button
            className="btn"
            onClick={handleRegister}
            disabled={isFetching}
          >
            Register
          </button>
          <div>or</div>
          <button className="btn" onClick={() => history.push("/login")}>
            Login
          </button>
        </div>
      </div>
  );
};

export default Register;
