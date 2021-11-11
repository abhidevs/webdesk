const MaterialsReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_MATERIALS_START":
      return {
        allMaterials: [],
        recentMaterials: [...state.recentMaterials],
        isFetching: true,
        error: false,
      };

    case "GET_ALL_MATERIALS_SUCCESS":
      return {
        allMaterials: action.payload,
        recentMaterials: [...state.recentMaterials],
        isFetching: false,
        error: false,
      };

    case "GET_ALL_MATERIALS_FAILURE":
      return {
        allMaterials: [],
        recentMaterials: [...state.recentMaterials],
        isFetching: false,
        error: action.payload,
      };

    case "GET_RECENT_MATERIALS_START":
      return {
        allMaterials: [...state.allMaterials],
        recentMaterials: [],
        isFetching: true,
        error: false,
      };

    case "GET_RECENT_MATERIALS_SUCCESS":
      return {
        allMaterials: [...state.allMaterials],
        recentMaterials: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_RECENT_MATERIALS_FAILURE":
      return {
        allMaterials: [...state.allMaterials],
        recentMaterials: [],
        isFetching: false,
        error: action.payload,
      };

    case "CREATE_NEW_MATERIAL_START":
      return {
        allMaterials: [...state.allMaterials],
        recentMaterials: [...state.recentMaterials],
        isFetching: true,
        error: false,
      };

    case "CREATE_NEW_MATERIAL_SUCCESS":
      return {
        allMaterials: [action.payload, ...state.allMaterials],
        recentMaterials: [action.payload, ...state.recentMaterials.slice(0, -1)],
        isFetching: false,
        error: false,
      };

    case "CREATE_NEW_MATERIAL_FAILURE":
      return {
        allMaterials: [...state.allMaterials],
        recentMaterials: [...state.recentMaterials],
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default MaterialsReducer;
