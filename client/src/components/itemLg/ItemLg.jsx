import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./style.scss";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AuthContext } from "../../context/authContext/AuthContext";
import { MaterialsContext } from "../../context/materialsContext/MaterialsContext";
import { DoubtsContext } from "../../context/doubtsContext/DoubtsContext";
import { TasksContext } from "../../context/tasksContext/TasksContext";
import { deleteMaterial } from "../../context/materialsContext/apiCalls";
import { deleteTask } from "../../context/tasksContext/apiCalls";
import { deleteDoubt } from "../../context/doubtsContext/apiCalls";

const ItemLg = ({
  type,
  itemId,
  itemTitle,
  posterId,
  postedBy,
  subject,
  timeOfposting,
  profilePicOfPoster,
  status,
  dueDate,
  votes,
  doubtDesc,
  data,
}) => {
  let moreOptions = [];

  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const openMore = Boolean(anchorEl);
  const moreBtn = useRef(null);

  const history = useHistory();

  const { user } = useContext(AuthContext);
  const { dispatch: materialsDispatch } = useContext(MaterialsContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const { dispatch: doubtsDispatch } = useContext(DoubtsContext);

  if (user._id === posterId || user.isAdmin) {
    moreOptions = ["Edit", "Delete", "Copy link"];
  } else {
    moreOptions = ["Copy link"];
  }

  const handleMoreBtnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMore = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleDialogBtnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.textContent === "Yes") {
      if (type === "material") {
        console.log(itemId);
        deleteMaterial(itemId, user, materialsDispatch);
      } else if (type === "task") {
        console.log(itemId);
        deleteTask(itemId, user, tasksDispatch);
      } else if (type === "doubt") {
        console.log(itemId);
        deleteDoubt(itemId, user, doubtsDispatch);
      }
    }

    setOpenConfirmDialog(false);
  };

  const handleOptionCLick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
    console.log(e.target.textContent);

    let selectedOption = e.target.textContent;

    if (selectedOption === "Edit") {
      history.push({
        pathname: `/${type}/${itemId}`,
        itemData: data,
        openEdit: true,
      });
    } else if (selectedOption === "Copy link") {
      let url = window.location.href;
      navigator.clipboard.writeText(url.substring(0, url.lastIndexOf("/") - 1));
    } else if (selectedOption === "Delete") {
      setOpenConfirmDialog(true);
    }
  };

  return (
    <Link
      to={{
        pathname: `/${type}/${itemId}`,
        itemData: data,
      }}
      className="link"
    >
      <div className={"itemLg " + type}>
        {type === "doubt" && (
          <div className="votes">
            <ArrowUpwardRoundedIcon className="icon" />
            <p>{votes}</p>
            <ArrowDownwardRoundedIcon className="icon" />
          </div>
        )}

        <div className="itemContent">
          <div className="topSection">
            <Link to={`/${type}s/${subject}`} className="link">
              <h4 className="subject">{subject}</h4>
            </Link>

            {type === "task" && (
              <p className={"dueDate " + status}>
                {status === "submitted" ? status : dueDate}
              </p>
            )}
          </div>

          <div className="bottomSection">
            <img src={profilePicOfPoster || dummyProfilePic} alt="profile" />
            <div className="textContent">
              <div className="titleSection">
                <h4 className="itemTitle">
                  {postedBy +
                    (type === "material"
                      ? " shared "
                      : type === "task"
                      ? " assigned "
                      : " asked ") +
                    itemTitle}
                </h4>
                <p>{timeOfposting}</p>
              </div>

              {type === "doubt" && <p className="doubtDesc">{doubtDesc}</p>}
            </div>
          </div>
        </div>

        <IconButton
          className="moreBtn"
          ref={moreBtn}
          onClick={handleMoreBtnClick}
          aria-label="more"
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          className="moreOptions"
          anchorEl={anchorEl}
          keepMounted
          onClose={handleCloseMore}
          open={openMore}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {moreOptions.map((option) => (
            <MenuItem key={option} value={option} onClick={handleOptionCLick}>
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete <b>{itemTitle + " ?"}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogBtnClick}
              style={{ textTransform: "none" }}
              size="large"
            >
              No
            </Button>
            <Button
              onClick={handleDialogBtnClick}
              autoFocus
              style={{ textTransform: "none" }}
              size="large"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Link>
  );
};

export default ItemLg;
