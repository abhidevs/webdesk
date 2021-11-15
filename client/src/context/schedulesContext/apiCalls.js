import axios from "axios";
import {
  getSchedulesFailure,
  getSchedulesStart,
  getSchedulesSuccess,
} from "./SchedulesActions";

export const getSchedules = async (user, dispatch) => {
  dispatch(getSchedulesStart());

  try {
    const res = await axios.get("/api/schedule/all?course=BCA", {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getSchedulesSuccess(res.data));
  } catch (err) {
    dispatch(getSchedulesFailure(err));
  }
};
