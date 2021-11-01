import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import React, { useState } from "react";
import loginimg from "../../assets/login-side-img.svg";
// import axios from "axios"
import { useHistory } from "react-router-dom";
import "./style.scss";

const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    // axios.post("http://localhost:9002/login", user).then((res) => {
    //   alert(res.data.message);
    //   setLoginUser(res.data.user);
    //   history.push("/");
    // });
  };

  return (
    <div className="login">
      <div className="image">
        <img src={loginimg} alt="" />
      </div>
      <div className="login-page">
        <h1>Login</h1>
        <div className="login-input">
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          ></input>
          <Email className="icon" />
        </div>

        <div className="login-input">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          ></input>
          <Lock className="icon" />
        </div>
        
        <div className="btn" onClick={login}>
          Login
        </div>
        <div>or</div>
        <div className="btn" onClick={() => history.push("/register")}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;
