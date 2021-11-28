import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./style.scss";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { logoutUser } from "../../context/authContext/apiCalls";

const dialogTitleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const closeBtnStyle = {
  position: "absolute",
  left: "10px",
  color: "var(--text-color2)",
};

const linkStyle = {
  textDecoration: "none",
};

const listItemStyle = {
  color: "var(--text-color2)",
  padding: "10px 0 10px 20%",
};

const listItemTextStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: "1.1 rem",
  fontWeight: "500",
  marginLeft: "5%",
};

const iconStyle = {
  fontSize: "26px",
};

const Navbar = () => {
  const location = useLocation();

  const { user, dispatch } = useContext(AuthContext);
  const [profileOptionsDialogOpened, setProfileOptionsDialogOpened] =
    useState(false);

  useEffect(() => {
    let currentTab = location.pathname.split("/")[1] || "home";
    if (currentTab !== "home" && currentTab.slice(-1) !== "s")
      currentTab += "s";

    const tabToSetActive = document.querySelector(`.link#${currentTab}`);
    if (tabToSetActive) tabToSetActive.classList.add("active");
  }, [location.pathname]);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="left">
          <Link to="/" className="link">
            <h3 className="logo">WebDesk</h3>
          </Link>
        </div>

        <div className="middle">
          <div className="nav-links">
            <Link to="/" className="link" id="home">
              <HomeOutlinedIcon className="icon" />
              <span>Home</span>
              <div className="navlink-border"></div>
            </Link>
            <Link to="/materials/all" className="link" id="materials">
              <NoteAltOutlinedIcon className="icon" />
              <span>Materials</span>
              <div className="navlink-border"></div>
            </Link>
            <Link to="/tasks/all" className="link" id="tasks">
              <AssignmentOutlinedIcon className="icon" />
              <span>Tasks</span>
              <div className="navlink-border"></div>
            </Link>
            <Link to="/doubts/all" className="link" id="doubts">
              <LiveHelpOutlinedIcon className="icon" />
              <span>Doubts</span>
              <div className="navlink-border"></div>
            </Link>
          </div>
        </div>

        <div className="right">
          <div
            className="profile"
            onClick={() => setProfileOptionsDialogOpened(true)}
          >
            <img src={user?.profilePic || dummyProfilePic} alt="profileimg" />
            <div className="userDetails">
              <span>{user?.fullname}</span>
              <span>{user?.isTeacher ? "Teacher" : "Student"}</span>
            </div>

            <ArrowDropDownIcon className="icon" />
          </div>

          <Dialog
            onClose={() => setProfileOptionsDialogOpened(false)}
            open={profileOptionsDialogOpened}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle disableTypography style={dialogTitleStyle}>
              <IconButton
                style={closeBtnStyle}
                onClick={() => setProfileOptionsDialogOpened(false)}
              >
                <CloseRoundedIcon style={{ fontSize: "26px" }} />
              </IconButton>
              <h3 style={{ color: "var(--primary-color)" }}>WebDesk</h3>
            </DialogTitle>
            <Divider variant="fullWidth" />

            <List sx={{ pt: 0 }}>
              <Link to="/userupdate" className="link" style={linkStyle}>
                <ListItem
                  button
                  style={listItemStyle}
                  onClick={() => setProfileOptionsDialogOpened(false)}
                >
                  <AccountCircleOutlinedIcon style={iconStyle} />
                  <ListItemText
                    disableTypography
                    style={listItemTextStyle}
                    primary="Update Profile"
                  />
                </ListItem>
              </Link>

              <Link to="/materials/all" className="link" style={linkStyle}>
                <ListItem
                  button
                  style={listItemStyle}
                  onClick={() => setProfileOptionsDialogOpened(false)}
                >
                  <NoteAltOutlinedIcon style={iconStyle} />
                  <ListItemText
                    disableTypography
                    style={listItemTextStyle}
                    primary="All Materials"
                  />
                </ListItem>
              </Link>

              <Link to="/tasks/all" className="link" style={linkStyle}>
                <ListItem
                  button
                  style={listItemStyle}
                  onClick={() => setProfileOptionsDialogOpened(false)}
                >
                  <AssignmentOutlinedIcon style={iconStyle} />
                  <ListItemText
                    disableTypography
                    style={listItemTextStyle}
                    primary="All Tasks"
                  />
                </ListItem>
              </Link>

              <Link to="/doubts/all" className="link" style={linkStyle}>
                <ListItem
                  button
                  style={listItemStyle}
                  onClick={() => setProfileOptionsDialogOpened(false)}
                >
                  <LiveHelpOutlinedIcon style={iconStyle} />
                  <ListItemText
                    disableTypography
                    style={listItemTextStyle}
                    primary="All Doubts"
                  />
                </ListItem>
              </Link>

              <Link to="/createclass" className="link" style={linkStyle}>
                <ListItem
                  button
                  style={listItemStyle}
                  onClick={() => setProfileOptionsDialogOpened(false)}
                >
                  <VideoCallOutlinedIcon style={iconStyle} />
                  <ListItemText
                    disableTypography
                    style={listItemTextStyle}
                    primary="Create Meeting"
                  />
                </ListItem>
              </Link>

              <Divider variant="fullWidth" />
              <ListItem
                button
                style={listItemStyle}
                onClick={() => {
                  setProfileOptionsDialogOpened(false);
                  logoutUser(dispatch);
                }}
              >
                <LogoutRoundedIcon style={iconStyle} />
                <ListItemText
                  disableTypography
                  style={listItemTextStyle}
                  primary="Logout"
                />
              </ListItem>
            </List>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
