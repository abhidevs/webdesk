const DoubtsReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_DOUBTS_START":
      return {
        allDoubts: [],
        recentDoubts: [...state.recentDoubts],
        isFetching: true,
        error: false,
      };

    case "GET_ALL_DOUBTS_SUCCESS":
      return {
        allDoubts: action.payload,
        recentDoubts: [...state.recentDoubts],
        isFetching: false,
        error: false,
      };

    case "GET_ALL_DOUBTS_FAILURE":
      return {
        allDoubts: [],
        recentDoubts: [...state.recentDoubts],
        isFetching: false,
        error: action.payload,
      };

    case "GET_RECENT_DOUBTS_START":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [],
        isFetching: true,
        error: false,
      };

    case "GET_RECENT_DOUBTS_SUCCESS":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_RECENT_DOUBTS_FAILURE":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [],
        isFetching: false,
        error: action.payload,
      };

    case "CREATE_NEW_DOUBT_START":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: true,
        error: false,
      };

    case "CREATE_NEW_DOUBT_SUCCESS":
      return {
        allDoubts: [action.payload, ...state.allDoubts],
        recentDoubts: [action.payload, ...state.recentDoubts.slice(0, -1)],
        isFetching: false,
        error: false,
      };

    case "UPDATE_DOUBT_START":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: true,
        error: false,
      };

    case "UPDATE_DOUBT_SUCCESS":
      return {
        allDoubts: [
          ...state.allDoubts.map((doubt) => {
            if (doubt._id === action.payload._id) return action.payload;
            else return doubt;
          }),
        ],
        recentDoubts: [
          ...state.recentDoubts.map((doubt) => {
            if (doubt._id === action.payload._id) return action.payload;
            else return doubt;
          }),
        ],
        isFetching: false,
        error: false,
      };

    case "UPDATE_DOUBT_FAILURE":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: false,
        error: action.payload,
      };
    case "CREATE_NEW_DOUBT_FAILURE":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_DOUBT_START":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: true,
        error: false,
      };

    case "DELETE_DOUBT_SUCCESS":
      return {
        allDoubts: [
          ...state.allDoubts.filter((doubt) => doubt._id !== action.payload),
        ],
        recentDoubts: [
          ...state.recentDoubts.filter((doubt) => doubt._id !== action.payload),
        ],
        isFetching: false,
        error: false,
      };

    case "DELETE_DOUBT_FAILURE":
      return {
        allDoubts: [...state.allDoubts],
        recentDoubts: [...state.recentDoubts],
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default DoubtsReducer;
