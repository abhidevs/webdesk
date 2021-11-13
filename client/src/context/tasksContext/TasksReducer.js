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

    case "CREATE_NEW_TASK_START":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: true,
        error: false,
      };

    case "CREATE_NEW_TASK_SUCCESS":
      return {
        allTasks: [action.payload, ...state.allTasks],
        recentTasks: [action.payload, ...state.recentTasks.slice(0, -1)],
        isFetching: false,
        error: false,
      };

    case "CREATE_NEW_TASK_FAILURE":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: false,
        error: action.payload,
      };

    case "UPDATE_TASK_START":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: true,
        error: false,
      };

    case "UPDATE_TASK_SUCCESS":
      return {
        allTasks: [
          ...state.allTasks.map((task) => {
            if (task._id === action.payload._id) return action.payload;
            else return task;
          }),
        ],
        recentTasks: [
          ...state.recentTasks.map((task) => {
            if (task._id === action.payload._id) return action.payload;
            else return task;
          }),
        ],
        isFetching: false,
        error: false,
      };

    case "UPDATE_TASK_FAILURE":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_TASK_START":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: true,
        error: false,
      };

    case "DELETE_TASK_SUCCESS":
      return {
        allTasks: [
          ...state.allTasks.filter((task) => task._id !== action.payload),
        ],
        recentTasks: [
          ...state.recentTasks.filter((task) => task._id !== action.payload),
        ],
        isFetching: false,
        error: false,
      };

    case "DELETE_TASK_FAILURE":
      return {
        allTasks: [...state.allTasks],
        recentTasks: [...state.recentTasks],
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default TasksReducer;
