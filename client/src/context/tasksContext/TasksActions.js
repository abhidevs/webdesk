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
