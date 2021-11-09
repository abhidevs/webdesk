import axios from "axios";
import {
  getAllTasksFailure,
  getAllTasksStart,
  getAllTasksSuccess,
  getRecentTasksFailure,
  getRecentTasksStart,
  getRecentTasksSuccess,
} from "./TasksActions";

export const getAllTasks = async (user, dispatch) => {
  dispatch(getAllTasksStart());

  try {
    const res = await axios.get("/task/all", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getAllTasksSuccess(res.data));
  } catch (err) {
    dispatch(getAllTasksFailure(err));
  }
};

export const getRecentTasks = async (user, dispatch) => {
  dispatch(getRecentTasksStart());

  try {
    const res = await axios.get("/task/recent", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getRecentTasksSuccess(res.data));
  } catch (err) {
    dispatch(getRecentTasksFailure(err));
  }
};
