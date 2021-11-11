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

    case "CREATE_NEW_DOUBT_FAILURE":
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
