// Get All Materials Actions
export const getAllMaterialsStart = () => ({
  type: "GET_ALL_MATERIALS_START",
});

export const getAllMaterialsSuccess = (allMaterials) => ({
  type: "GET_ALL_MATERIALS_SUCCESS",
  payload: allMaterials,
});

export const getAllMaterialsFailure = (error) => ({
  type: "GET_ALL_MATERIALS_FAILURE",
  payload: error,
});

// Get Recent Materials Actions
export const getRecentMaterialsStart = () => ({
  type: "GET_RECENT_MATERIALS_START",
});

export const getRecentMaterialsSuccess = (recentMaterials) => ({
  type: "GET_RECENT_MATERIALS_SUCCESS",
  payload: recentMaterials,
});

export const getRecentMaterialsFailure = (error) => ({
  type: "GET_RECENT_MATERIALS_FAILURE",
  payload: error,
});
