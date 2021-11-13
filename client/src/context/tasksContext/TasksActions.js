// Get All Tasks Actions
export const getAllTasksStart = () => ({
  type: "GET_ALL_TASKS_START",
});

export const getAllTasksSuccess = (allTasks) => ({
  type: "GET_ALL_TASKS_SUCCESS",
  payload: allTasks,
});

export const getAllTasksFailure = (error) => ({
  type: "GET_ALL_TASKS_FAILURE",
  payload: error,
});

// Get Recent Tasks Actions
export const getRecentTasksStart = () => ({
  type: "GET_RECENT_TASKS_START",
});

export const getRecentTasksSuccess = (recentTasks) => ({
  type: "GET_RECENT_TASKS_SUCCESS",
  payload: recentTasks,
});

export const getRecentTasksFailure = (error) => ({
  type: "GET_RECENT_TASKS_FAILURE",
  payload: error,
});

// Create New Task Actions
export const createNewTaskStart = () => ({
  type: "CREATE_NEW_TASK_START",
});

export const createNewTaskSuccess = (newTask) => ({
  type: "CREATE_NEW_TASK_SUCCESS",
  payload: newTask,
});

export const createNewTaskFailure = (error) => ({
  type: "CREATE_NEW_TASK_FAILURE",
  payload: error,
});

// Update Task Actions
export const updateTaskStart = () => ({
  type: "UPDATE_TASK_START",
});

export const updateTaskSuccess = (task) => ({
  type: "UPDATE_TASK_SUCCESS",
  payload: task,
});

export const updateTaskFailure = (error) => ({
  type: "UPDATE_TASK_FAILURE",
  payload: error,
});

// Delete Task Actions
export const deleteTaskStart = () => ({
  type: "DELETE_TASK_START",
});

export const deleteTaskSuccess = (taskId) => ({
  type: "DELETE_TASK_SUCCESS",
  payload: taskId,
});

export const deleteTaskFailure = (error) => ({
  type: "DELETE_TASK_FAILURE",
  payload: error,
});
