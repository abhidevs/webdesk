// Get Schedules Actions
export const getSchedulesStart = () => ({
  type: "GET_SCHEDULES_START",
});

export const getSchedulesSuccess = (schedules) => ({
  type: "GET_SCHEDULES_SUCCESS",
  payload: schedules,
});

export const getSchedulesFailure = (error) => ({
  type: "GET_SCHEDULES_FAILURE",
  payload: error,
});
