// Login Actions
export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});


// Register Actions
export const RegisterStart = () => ({
  type: "REGISTER_START",
});

export const RegisterSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const RegisterFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});


// Logout Actions
export const logout = () => ({
  type: "LOGOUT",
});