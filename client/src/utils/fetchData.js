import axios from "axios";

export const getSubject = async (subjectId) => {
  try {
    const res = await axios.get(`/subject/find/${subjectId}`, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODNmYmM0ZWQ3YTJmYTFmOTllM2NiMiIsImlzVGVhY2hlciI6ZmFsc2UsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjIwNDM1MSwiZXhwIjoxNjM4Nzk2MzUxfQ.k-sIkJcXojewq5UqkE2ne0Xt0huotWz6uMj-L2cCznc",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPosterProfile = async (posterId) => {
  try {
    const res = await axios.get(`/user/${posterId}`, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODNmYmM0ZWQ3YTJmYTFmOTllM2NiMiIsImlzVGVhY2hlciI6ZmFsc2UsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjIwNDM1MSwiZXhwIjoxNjM4Nzk2MzUxfQ.k-sIkJcXojewq5UqkE2ne0Xt0huotWz6uMj-L2cCznc",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
