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

// Create New Doubt Actions
export const createNewDoubtStart = () => ({
  type: "CREATE_NEW_DOUBT_START",
});

export const createNewDoubtSuccess = (newDoubt) => ({
  type: "CREATE_NEW_DOUBT_SUCCESS",
  payload: newDoubt,
});

export const createNewDoubtFailure = (error) => ({
  type: "CREATE_NEW_DOUBT_FAILURE",
  payload: error,
});

// Update Doubt Actions
export const updateDoubtStart = () => ({
  type: "UPDATE_DOUBT_START",
});

export const updateDoubtSuccess = (doubt) => ({
  type: "UPDATE_DOUBT_SUCCESS",
  payload: doubt,
});

export const updateDoubtFailure = (error) => ({
  type: "UPDATE_DOUBT_FAILURE",
  payload: error,
});

// Delete Doubt Actions
export const deleteDoubtStart = () => ({
  type: "DELETE_DOUBT_START",
});

export const deleteDoubtSuccess = (doubtId) => ({
  type: "DELETE_DOUBT_SUCCESS",
  payload: doubtId,
});

export const deleteDoubtFailure = (error) => ({
  type: "DELETE_DOUBT_FAILURE",
  payload: error,
});
