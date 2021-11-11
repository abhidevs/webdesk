import axios from "axios";
import {
  createNewTaskFailure,
  createNewTaskStart,
  createNewTaskSuccess,
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

export const createNewTask = async (task, user, dispatch) => {
  dispatch(createNewTaskStart());

  try {
    const res = await axios.post("/task", task, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(createNewTaskSuccess(res.data));
  } catch (err) {
    dispatch(createNewTaskFailure(err));
  }
};
