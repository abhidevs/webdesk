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
    const res = await axios.get("/api/material/all", {
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
    const res = await axios.get("/api/material/recent", {
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
    const res = await axios.post("/api/material", material, {
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
    const res = await axios.put(`/api/material/${material._id}`, material, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.status);
    if (res.status === 200) {
      dispatch(updateMaterialSuccess(res.data));
      return res.data;
    }
  } catch (err) {
    dispatch(updateMaterialFailure(err));
  }
};

export const deleteMaterial = async (materialId, user, dispatch) => {
  dispatch(deleteMaterialStart());

  try {
    const res = await axios.delete(`/api/material/${materialId}`, {
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

export const createCommentInMaterial = async (comment, user, dispatch) => {
  dispatch(updateMaterialStart());

  try {
    const res = await axios.post("/api/material/comment", comment, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    if (res.status === 201) {
      dispatch(updateMaterialSuccess(res.data));
      return res.data;
    }
  } catch (err) {
    dispatch(updateMaterialFailure(err));
  }
};

export const updateCommentInMaterial = async (comment, user, dispatch) => {
  dispatch(updateMaterialStart());

  try {
    const res = await axios.put(
      `/api/material/comment/${comment.commentId}`,
      comment,
      {
        headers: {
          token: "Bearer " + user.accessToken,
        },
      }
    );

    // console.log(res.data);
    if (res.status === 200) {
      dispatch(updateMaterialSuccess(res.data));
      return res.data;
    }
  } catch (err) {
    dispatch(updateMaterialFailure(err));
  }
};

export const deleteCommentInMaterial = async (comment, user, dispatch) => {
  dispatch(updateMaterialStart());

  try {
    const res = await axios.put(
      `/api/material/deletecomment/${comment.commentId}`,
      comment,
      {
        headers: {
          token: "Bearer " + user.accessToken,
        },
      }
    );

    // console.log(res.data);
    if (res.status === 200) {
      dispatch(updateMaterialSuccess(res.data));
      return res.data;
    }
  } catch (err) {
    dispatch(updateMaterialFailure(err));
  }
};
