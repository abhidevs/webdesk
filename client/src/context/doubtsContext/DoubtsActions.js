// Get All Doubts Actions
export const getAllDoubtsStart = () => ({
  type: "GET_ALL_DOUBTS_START",
});

export const getAllDoubtsSuccess = (allDoubts) => ({
  type: "GET_ALL_DOUBTS_SUCCESS",
  payload: allDoubts,
});

export const getAllDoubtsFailure = (error) => ({
  type: "GET_ALL_DOUBTS_FAILURE",
  payload: error,
});

// Get Recent Doubts Actions
export const getRecentDoubtsStart = () => ({
  type: "GET_RECENT_DOUBTS_START",
});

export const getRecentDoubtsSuccess = (recentDoubts) => ({
  type: "GET_RECENT_DOUBTS_SUCCESS",
  payload: recentDoubts,
});

export const getRecentDoubtsFailure = (error) => ({
  type: "GET_RECENT_DOUBTS_FAILURE",
  payload: error,
});
