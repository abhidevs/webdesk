const SchedulesReducer = (state, action) => {
  switch (action.type) {
    case "GET_SCHEDULES_START":
      return {
        schedules: [],
        isFetching: true,
        error: false,
      };

    case "GET_SCHEDULES_SUCCESS":
      return {
        schedules: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_SCHEDULES_FAILURE":
      return {
        schedules: [],
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default SchedulesReducer;
