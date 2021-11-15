import React, { useContext, useState } from "react";
import "./style.scss";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CancelRounded from "@material-ui/icons/CancelRounded";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AuthContext } from "../../context/authContext/AuthContext";
import { MaterialsContext } from "../../context/materialsContext/MaterialsContext";
import { TasksContext } from "../../context/tasksContext/TasksContext";
import {
  createCommentInMaterial,
  deleteCommentInMaterial,
  updateCommentInMaterial,
} from "../../context/materialsContext/apiCalls";
import {
  createCommentInTask,
  deleteCommentInTask,
  updateCommentInTask,
} from "../../context/tasksContext/apiCalls";

const ClassComment = ({
  inputMode,
  commentId,
  parentType,
  posterId,
  postedBy,
  timeOfPosting,
  profilePic,
  message,
  itemId,
  setDataChanged,
}) => {
  const { user } = useContext(AuthContext);
  const { dispatch: materialsDispatch } = useContext(MaterialsContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const [comment, setComment] = useState("");

  let moreOptions = ["Edit", "Delete"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openInput, setOpenInput] = useState(inputMode);
  const [editing, setEditing] = useState(false);
  const openMore = Boolean(anchorEl);

  const handleMoreBtnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMore = (e) => {
    setAnchorEl(null);
  };

  const handleDialogBtnClick = (e) => {
    if (e.target.textContent === "Yes") {
      if (parentType === "material") {
        deleteCommentInMaterial(
          { commentId, posterId, itemId },
          user,
          materialsDispatch
        ).then((updatedData) => updatedData && setDataChanged(updatedData));
      } else if (parentType === "task") {
        deleteCommentInTask(
          { commentId, posterId, itemId },
          user,
          tasksDispatch
        ).then((updatedData) => updatedData && setDataChanged(updatedData));
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
      setEditing(true);
      setOpenInput(true);
      setComment(message);
    } else if (selectedOption === "Delete") {
      setOpenConfirmDialog(true);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setOpenInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;

    if (editing) {
      if (parentType === "material") {
        updateCommentInMaterial(
          { comment, commentId, posterId, itemId },
          user,
          materialsDispatch
        ).then((updatedData) => updatedData && setDataChanged(updatedData));
        setEditing(false);
        setOpenInput(false);
        setComment("");
      } else if (parentType === "task") {
        updateCommentInTask(
          { comment, commentId, posterId, itemId },
          user,
          tasksDispatch
        ).then((updatedData) => updatedData && setDataChanged(updatedData));
        setEditing(false);
        setOpenInput(false);
        setComment("");
      }
    } else {
      if (parentType === "material") {
        createCommentInMaterial(
          { comment, itemId },
          user,
          materialsDispatch
        ).then((updatedData) => updatedData && setDataChanged(updatedData));
      } else if (parentType === "task") {
        createCommentInTask({ comment, itemId }, user, tasksDispatch).then(
          (updatedData) => updatedData && setDataChanged(updatedData)
        );
      }
    }
    setComment("");
  };

  return (
    <div
      className={"comment " + (openInput ? "writeComment" : "writtenComment")}
    >
      <img
        src={
          openInput
            ? user?.profilePic || dummyProfilePic
            : profilePic || dummyProfilePic
        }
        alt="profile"
      />

      {openInput ? (
        <form className="inputSection" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add class comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {editing && (
            <IconButton
              className="cancelBtn"
              onClick={handleCancelEdit}
              aria-label="cancel"
            >
              <CancelRounded color="error" />
            </IconButton>
          )}
          <IconButton type="submit" disabled={!comment}>
            <SendIcon />
          </IconButton>
        </form>
      ) : (
        <>
          <div className="textContent">
            <div className="topSection">
              <h4>{postedBy}</h4>
              <p>{timeOfPosting}</p>
            </div>
            <p className="message">{message}</p>
          </div>

          {(user._id === posterId || user.isAdmin) && (
            <>
              <IconButton
                className="moreBtn"
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
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={handleOptionCLick}
                  >
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
                    Do you want to delete <b>{message + " ?"}</b>
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClassComment;
