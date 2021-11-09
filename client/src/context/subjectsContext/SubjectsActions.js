// Get Subjects Actions
export const getSubjectsStart = () => ({
  type: "GET_SUBJECTS_START",
});

export const getSubjectsSuccess = (subjects) => ({
  type: "GET_SUBJECTS_SUCCESS",
  payload: subjects,
});

export const getSubjectsFailure = (error) => ({
  type: "GET_SUBJECTS_FAILURE",
  payload: error,
});