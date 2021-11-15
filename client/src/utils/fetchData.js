import axios from "axios";

export const getItemdata = async (type, itemId, user) => {
  try {
    const res = await axios.get(`/api/${type}/find/${itemId}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
