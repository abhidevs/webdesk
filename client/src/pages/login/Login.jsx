import React, { useContext, useState } from "react";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { loginUser } from "../../context/authContext/apiCalls";

const Login = ({ setLoginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const handleLogin = () => {
    if (email && password) {
      loginUser({ email, password }, dispatch);
    } else {
      alert("Please fillup all fields");
    }
  };

  return (
    <div className="login">
      <div className="login-page">
        <h1>Login</h1>
        <div className="login-input">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          ></input>
          <Email className="icon" />
        </div>

        <div className="login-input">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          ></input>
          <Lock className="icon" />
        </div>

        <button className="btn" onClick={handleLogin} disabled={isFetching}>
          Login
        </button>
        <div>or</div>
        <button className="btn" onClick={() => history.push("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
