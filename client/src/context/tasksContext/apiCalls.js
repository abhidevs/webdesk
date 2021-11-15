import axios from "axios";
import {
  createNewTaskFailure,
  createNewTaskStart,
  createNewTaskSuccess,
  deleteTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  getAllTasksFailure,
  getAllTasksStart,
  getAllTasksSuccess,
  getRecentTasksFailure,
  getRecentTasksStart,
  getRecentTasksSuccess,
  updateTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
} from "./TasksActions";

export const getAllTasks = async (user, dispatch) => {
  dispatch(getAllTasksStart());

  try {
    const res = await axios.get("/api/task/all", {
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
    const res = await axios.get("/api/task/recent", {
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
    const res = await axios.post("/api/task", task, {
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

export const updateTask = async (task, user, dispatch) => {
  dispatch(updateTaskStart());

  try {
    const res = await axios.put(`/api/task/${task._id}`, task, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    dispatch(updateTaskSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateTaskFailure(err));
  }
};

export const deleteTask = async (taskId, user, dispatch) => {
  dispatch(deleteTaskStart());

  try {
    const res = await axios.delete(`/api/task/${taskId}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    if (res.status === 200) dispatch(deleteTaskSuccess(taskId));
  } catch (err) {
    dispatch(deleteTaskFailure(err));
  }
};

export const createCommentInTask = async (comment, user, dispatch) => {
  dispatch(updateTaskStart());

  try {
    const res = await axios.post("/api/task/comment", comment, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(updateTaskSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateTaskFailure(err));
  }
};

export const updateCommentInTask = async (comment, user, dispatch) => {
  dispatch(updateTaskStart());

  try {
    const res = await axios.put(`/api/task/comment/${comment.commentId}`, comment, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(updateTaskSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateTaskFailure(err));
  }
};

export const deleteCommentInTask = async (comment, user, dispatch) => {
  dispatch(updateTaskStart());

  try {
    const res = await axios.put(
      `/api/task/deletecomment/${comment.commentId}`,
      comment,
      {
        headers: {
          token: "Bearer " + user.accessToken,
        },
      }
    );

    // console.log(res.data);
    if (res.status === 200) {
      dispatch(updateTaskSuccess(res.data));
      return res.data;
    }
  } catch (err) {
    dispatch(updateTaskFailure(err));
  }
};
