import axios from "axios";
import {
  createNewDoubtFailure,
  createNewDoubtStart,
  createNewDoubtSuccess,
  getAllDoubtsFailure,
  getAllDoubtsStart,
  getAllDoubtsSuccess,
  getRecentDoubtsFailure,
  getRecentDoubtsStart,
  getRecentDoubtsSuccess,
} from "./DoubtsActions";

export const getAllDoubts = async (user, dispatch) => {
  dispatch(getAllDoubtsStart());

  try {
    const res = await axios.get("/doubt/all", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getAllDoubtsSuccess(res.data));
  } catch (err) {
    dispatch(getAllDoubtsFailure(err));
  }
};

export const getRecentDoubts = async (user, dispatch) => {
  dispatch(getRecentDoubtsStart());

  try {
    const res = await axios.get("/doubt/recent", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getRecentDoubtsSuccess(res.data));
  } catch (err) {
    dispatch(getRecentDoubtsFailure(err));
  }
};

export const createNewDoubt = async (doubt, user, dispatch) => {
  dispatch(createNewDoubtStart());

  try {
    const res = await axios.post("/doubt", doubt, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(createNewDoubtSuccess(res.data));
  } catch (err) {
    dispatch(createNewDoubtFailure(err));
  }
};
