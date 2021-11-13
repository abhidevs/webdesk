import axios from "axios";
import {
  createNewMaterialFailure,
  createNewMaterialStart,
  createNewMaterialSuccess,
  deleteMaterialFailure,
  deleteMaterialStart,
  deleteMaterialSuccess,
  getAllMaterialsFailure,
  getAllMaterialsStart,
  getAllMaterialsSuccess,
  getRecentMaterialsFailure,
  getRecentMaterialsStart,
  getRecentMaterialsSuccess,
  updateMaterialFailure,
  updateMaterialStart,
  updateMaterialSuccess,
} from "./MaterialsActions";

export const getAllMaterials = async (user, dispatch) => {
  dispatch(getAllMaterialsStart());

  try {
    const res = await axios.get("/material/all", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getAllMaterialsSuccess(res.data));
  } catch (err) {
    dispatch(getAllMaterialsFailure(err));
  }
};

export const getRecentMaterials = async (user, dispatch) => {
  dispatch(getRecentMaterialsStart());

  try {
    const res = await axios.get("/material/recent", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getRecentMaterialsSuccess(res.data));
  } catch (err) {
    dispatch(getRecentMaterialsFailure(err));
  }
};

export const createNewMaterial = async (material, user, dispatch) => {
  dispatch(createNewMaterialStart());

  try {
    const res = await axios.post("/material", material, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(createNewMaterialSuccess(res.data));
  } catch (err) {
    dispatch(createNewMaterialFailure(err));
  }
};

export const updateMaterial = async (material, user, dispatch) => {
  dispatch(updateMaterialStart());

  try {
    const res = await axios.put(`/material/${material._id}`, material, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    dispatch(updateMaterialSuccess(res.data));
  } catch (err) {
    dispatch(updateMaterialFailure(err));
  }
};

export const deleteMaterial = async (materialId, user, dispatch) => {
  dispatch(deleteMaterialStart());

  try {
    const res = await axios.delete(`/material/${materialId}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    if (res.status === 200) dispatch(deleteMaterialSuccess(materialId));
  } catch (err) {
    dispatch(deleteMaterialFailure(err));
  }
};
