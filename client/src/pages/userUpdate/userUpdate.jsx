import React, { useContext, useState } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Person from "@material-ui/icons/Person";
import SchoolRounded from "@material-ui/icons/SchoolRounded";
import MenuBookRounded from "@material-ui/icons/MenuBookRounded";
import Email from "@material-ui/icons/Email";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { AuthContext } from "../../context/authContext/AuthContext";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import { Button } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";
import { updateUser } from "../../context/authContext/apiCalls";
import { LoadingButton } from "@mui/lab";

function UserUpdate() {
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    course: user?.course || "",
    semester: user?.semester || "",
    profilePic: user?.profilePic || "",
  });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    setUpdateLoading(true);
    let tempData = { ...userInfo };

    if (newProfilePic) {
      const filename = new Date().getTime() + newProfilePic.name;
      const storageRef = ref(storage, `/files/${filename}`);

      uploadBytes(storageRef, newProfilePic).then((snapshot) => {
        console.log(`${newProfilePic.name} file succesfully uploaded`);

        getDownloadURL(snapshot.ref).then((downloadURL) => {
          tempData.profilePic = downloadURL;
          updateUser(user, tempData, dispatch);
          setUpdateLoading(false);
        });
      });
    } else {
      updateUser(user, tempData, dispatch);
      setUpdateLoading(false);
    }
    console.log(tempData);
  };

  const handleProfilePicChange = ({ target: { files } }) => {
    if (files[0]) {
      setNewProfilePic(files[0]);
      setUserInfo({ ...userInfo, profilePic: URL.createObjectURL(files[0]) });
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="user-page">
        <div className="userimg">
          <img src={userInfo.profilePic || dummyProfilePic} alt="profile" />
          <div class="upload">
            <Button
              variant="text"
              component="label"
              disableElevation
              endIcon={<PhotoCamera className="cam" />}
            >
              <input type="file" hidden onChange={handleProfilePicChange} />
            </Button>
          </div>
        </div>

        <h2>Profile Update</h2>
        <div className="edit-user">
          <div className="user-input">
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={userInfo.fullname}
              onChange={handleChange}
            ></input>
            <Person className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={userInfo.email}
              onChange={handleChange}
            ></input>
            <Email className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="course"
              placeholder="Enter your course"
              value={userInfo.course}
              onChange={handleChange}
            ></input>
            <SchoolRounded className="icon" />
          </div>

          <div className="user-input">
            <input
              type="text"
              name="semester"
              placeholder="Enter your semester"
              value={userInfo.semester}
              onChange={handleChange}
            ></input>
            <MenuBookRounded className="icon" />
          </div>
        </div>

        <div className="save-psswd">
          <LoadingButton
            variant="contained"
            className="btn"
            onClick={handleSubmit}
            style={{ textTransform: "none" }}
            loading={updateLoading || isFetching}
            loadingPosition="center"
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
export default UserUpdate;
