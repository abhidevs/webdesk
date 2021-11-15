import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import Add from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
import { TasksContext } from "../../context/tasksContext/TasksContext";
import { deleteMaterial } from "../../context/materialsContext/apiCalls";
import { deleteTask } from "../../context/tasksContext/apiCalls";
import formatDatetime from "../../utils/formatDatetime";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDoubt } from "../../context/doubtsContext/apiCalls";
import { DoubtsContext } from "../../context/doubtsContext/DoubtsContext";
import ItemForm from "../itemForm/ItemForm";

const DetailedItem = ({ type, data, openEdit }) => {
  const { id: itemId } = useParams();
  const [item, setItem] = useState(null);
  let moreOptions = [];

  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(openEdit || false);
  const openMore = Boolean(anchorEl);
  const moreBtn = useRef(null);

  const history = useHistory();

  const { user } = useContext(AuthContext);
  const { dispatch: materialsDispatch } =
    useContext(MaterialsContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const { dispatch: doubtsDispatch } = useContext(DoubtsContext);

  useEffect(() => {
    setItem(data);
  }, [data]);

  if (user?._id === item?.poster?._id || user.isAdmin) {
    moreOptions = ["Edit", "Delete", "Copy link"];
  } else {
    moreOptions = ["Copy link"];
  }

  if (type === "doubtResponse")
    moreOptions = moreOptions.filter((op) => op !== "Copy link");

  useEffect(() => {
    if (moreOptions.length === 0) moreBtn.current.style.display = "none";
  }, [moreOptions.length]);

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
        history.push("/");
      } else if (type === "task") {
        console.log(itemId);
        deleteTask(itemId, user, tasksDispatch);
        history.push("/");
      } else if (type === "doubt" || type === "doubtResponse") {
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

    if (selectedOption === "Copy link") {
      let url = window.location.href;
      navigator.clipboard.writeText(url);
    } else if (selectedOption === "Delete") {
      setOpenConfirmDialog(true);
    } else if (selectedOption === "Edit") {
      setOpenEditForm(true);
    }
  };

  return (
    <>
      {!openEditForm ? (
        <div className={"detailedItem " + type}>
          {type === "doubt" || type === "doubtResponse" ? (
            <>
              <div className="votes">
                <ArrowUpwardRoundedIcon className="icon" />
                <p>{item?.votes}</p>
                <ArrowDownwardRoundedIcon className="icon" />
              </div>

              <div className="itemContent">
                {type === "doubt" && (
                  <div className="topSection">
                    <Link
                      to={`/${type}s/${item?.subject?.name}`}
                      className="link"
                    >
                      <h4 className="subject">{item?.subject?.name}</h4>
                    </Link>
                  </div>
                )}

                <div className="bottomSection">
                  <img
                    src={item?.poster?.profilePic || dummyProfilePic}
                    alt="profile"
                  />
                  <div className="textContent">
                    <div className="titleSection">
                      <h4 className="itemTitle">
                        {item?.poster?.fullname +
                          (type === "doubtResponse"
                            ? " answered to this question"
                            : " asked " + item?.title)}
                      </h4>
                      <p>{formatDatetime(item?.createdAt)}</p>
                    </div>

                    <p className="doubtDesc">{item?.description}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="itemInfo">
                <h1 className="title">{item?.title}</h1>
                <div className="name-and-time">
                  <h5>{item?.poster?.fullname}</h5>
                  <h5 className="Postingtime">
                    {formatDatetime(item?.createdAt)}
                  </h5>
                </div>
                <h5 className="subject">{item?.subject?.name}</h5>

                {item?.attachments?.map((a) => (
                  <div className="filename">
                    <DescriptionOutlinedIcon className="icon" />
                    <h3>{a?.filename}</h3>
                  </div>
                ))}
              </div>

              {type === "task" && (
                <div className="your-work">
                  <div className="topDiv">
                    {item?.points && (
                      <h5 className="points">{item?.points} points</h5>
                    )}
                    {item?.dueDatetime && (
                      <h5 className="dueDatetime">
                        Due {formatDatetime(item?.dueDatetime)}
                      </h5>
                    )}
                  </div>
                  <div className="workinfo">
                    <h3>Your Work</h3>
                    <p>Assigned</p>
                  </div>

                  <button className="add-btn">
                    <Add className="icon" />
                    Add or Create
                  </button>
                  <button className="mark-btn">Mark as Done</button>
                </div>
              )}
            </>
          )}

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
                Do you want to delete <b>{item?.title + " ?"}</b>
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
      ) : (
        <>
          {(user._id === item?.poster._id || user.isAdmin) && (
            <ItemForm
              type={type}
              editForm
              open={openEditForm}
              setOpenEditForm={setOpenEditForm}
              data={item || data}
              setData={setItem}
            />
          )}
        </>
      )}
    </>
  );
};

export default DetailedItem;
