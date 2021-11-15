import axios from "axios";
import { loginFailure, loginStart, loginSuccess, RegisterFailure, RegisterStart, RegisterSuccess } from "./AuthActions";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const registerUser = async (user, dispatch) => {
  dispatch(RegisterStart());

  try {
    const res = await axios.post("/api/auth/register", user);
    dispatch(RegisterSuccess(res.data));
  } catch (err) {
    dispatch(RegisterFailure(err));
  }
};
