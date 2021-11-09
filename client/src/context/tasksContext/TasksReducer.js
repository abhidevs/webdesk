const TasksReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_TASKS_START":
      return {
        allTasks: [],
        recentTasks: [...state.recentTasks],
        isFetching: true,
        error: false,
      };

    case "GET_ALL_TASKS_SUCCESS":
      return {
        allTasks: action.payload,
        recentTasks: [...state.recentTasks],
        isFetching: false,
        error: false,
      };

    case "GET_ALL_TASKS_FAILURE":
      return {
        allTasks: [],
        recentTasks: [...state.recentTasks],
        isFetching: false,
        error: action.payload,
      };

    case "GET_RECENT_TASKS_START":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [],
        isFetching: true,
        error: false,
      };

    case "GET_RECENT_TASKS_SUCCESS":
      return {
        allTasks: [...state.allTasks],
        recentTasks: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_RECENT_TASKS_FAILURE":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [],
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default TasksReducer;
