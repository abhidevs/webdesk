import axios from "axios";
import {
  getAllMaterialsFailure,
  getAllMaterialsStart,
  getAllMaterialsSuccess,
  getRecentMaterialsFailure,
  getRecentMaterialsStart,
  getRecentMaterialsSuccess,
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
