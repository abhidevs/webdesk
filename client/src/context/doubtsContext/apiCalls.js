import axios from "axios";
import {
  createNewDoubtFailure,
  createNewDoubtStart,
  createNewDoubtSuccess,
  deleteDoubtFailure,
  deleteDoubtStart,
  deleteDoubtSuccess,
  getAllDoubtsFailure,
  getAllDoubtsStart,
  getAllDoubtsSuccess,
  getRecentDoubtsFailure,
  getRecentDoubtsStart,
  getRecentDoubtsSuccess,
  updateDoubtFailure,
  updateDoubtStart,
  updateDoubtSuccess,
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

export const updateDoubt = async (doubt, user, dispatch) => {
  dispatch(updateDoubtStart());

  try {
    const res = await axios.put(`/doubt/${doubt._id}`, doubt, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    dispatch(updateDoubtSuccess(res.data));
  } catch (err) {
    dispatch(updateDoubtFailure(err));
  }
};

export const deleteDoubt = async (doubtId, user, dispatch) => {
  dispatch(deleteDoubtStart());

  try {
    const res = await axios.delete(`/doubt/${doubtId}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    if (res.status === 200) dispatch(deleteDoubtSuccess(doubtId));
  } catch (err) {
    dispatch(deleteDoubtFailure(err));
  }
};
