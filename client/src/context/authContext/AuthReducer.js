const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "REGISTER_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "UPDATE_USER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_USER_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default AuthReducer;
