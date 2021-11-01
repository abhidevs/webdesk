import React, { useState } from "react";
import "./style.scss";
import registerimg from "../../assets/reg-side-img.svg";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import  Person  from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    // const { name, email, password, reEnterPassword } = user;
    // if (name && email && password && password === reEnterPassword) {
    //   axios.post("http://localhost:9002/register", user).then((res) => {
    //     alert(res.data.message);
    //     history.push("/login");
    //   });
    // } else {
    //   alert("invlid input");
    // }
  };

  return (
    <div className="register">
      <div className="side-img">
        <img src={registerimg} alt="" />
      </div>
      <div className="register-page">
        <h1>Register</h1>
        <div className="register-input">
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Your Name"
            onChange={handleChange}
          ></input>
          <Person className="icon"/>
        </div>
        <div className="register-input">
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Your Email"
            onChange={handleChange}
          ></input>
          <Email className="icon"/>
        </div>
        <div className="register-input">
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Your Password"
            onChange={handleChange}
          ></input>
          <Lock className="icon"/>
        </div>
        <div className="register-input">
          <input
            type="password"
            name="reEnterPassword"
            value={user.reEnterPassword}
            placeholder="Re-enter Password"
            onChange={handleChange}
          ></input>
          <Lock className="icon"/>
        </div>
        <div className="btn" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="btn" onClick={() => history.push("/login")}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Register;
