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

// Create New Material Actions
export const createNewMaterialStart = () => ({
  type: "CREATE_NEW_MATERIAL_START",
});

export const createNewMaterialSuccess = (newMaterial) => ({
  type: "CREATE_NEW_MATERIAL_SUCCESS",
  payload: newMaterial,
});

export const createNewMaterialFailure = (error) => ({
  type: "CREATE_NEW_MATERIAL_FAILURE",
  payload: error,
});

// Update Material Actions
export const updateMaterialStart = () => ({
  type: "UPDATE_MATERIAL_START",
});

export const updateMaterialSuccess = (material) => ({
  type: "UPDATE_MATERIAL_SUCCESS",
  payload: material,
});

export const updateMaterialFailure = (error) => ({
  type: "UPDATE_MATERIAL_FAILURE",
  payload: error,
});

// Delete Material Actions
export const deleteMaterialStart = () => ({
  type: "DELETE_MATERIAL_START",
});

export const deleteMaterialSuccess = (materialId) => ({
  type: "DELETE_MATERIAL_SUCCESS",
  payload: materialId,
});

export const deleteMaterialFailure = (error) => ({
  type: "DELETE_MATERIAL_FAILURE",
  payload: error,
});
