import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import dummyProfilePic from "../../assets/dummyProfilePic.png";
import { Box, Button, Grid, MenuItem, TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";
import { AuthContext } from "../../context/authContext/AuthContext";
import { SubjectsContext } from "../../context/subjectsContext/SubjectsContext";
import { MaterialsContext } from "../../context/materialsContext/MaterialsContext";
import { TasksContext } from "../../context/tasksContext/TasksContext";
import { DoubtsContext } from "../../context/doubtsContext/DoubtsContext";
import { createNewMaterial } from "../../context/materialsContext/apiCalls";
import { createNewTask } from "../../context/tasksContext/apiCalls";
import { createNewDoubt } from "../../context/doubtsContext/apiCalls";

const ItemForm = ({ type, profilePic, currentSubject }) => {
  const placeholders = {
    material: "Create new material",
    task: "Assign new task",
    doubt: "Ask your doubt",
  };

  const [onFocus, setOnFocus] = useState(false);
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    subject: currentSubject,
    attachments: [],
    dueDatetime: null,
    points: null,
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    subject: "",
    attachments: "",
    dueDatetime: "",
    points: "",
  });
  const [filesLeftForUpload, setFilesLeftForUpload] = useState(0);

  const { user } = useContext(AuthContext);
  const { subjects } = useContext(SubjectsContext);
  const { dispatch: materialsDispatch } = useContext(MaterialsContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);
  const { dispatch: doubtsDispatch } = useContext(DoubtsContext);

  useEffect(() => {
    setFormdata({ ...formdata, subject: currentSubject });
    setFormErrors({ ...formErrors, subject: "" });
  }, [currentSubject]);

  const handleChange = ({ target: { name, value } }) => {
    setFormdata({ ...formdata, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const filename = new Date().getTime() + item.name;
      const storageRef = ref(storage, `/files/${filename}`);

      uploadBytes(storageRef, item).then((snapshot) => {
        console.log(`${item.name} file succesfully uploaded`);

        getDownloadURL(snapshot.ref).then((downloadURL) => {
          let tempFormData = { ...formdata };
          tempFormData.attachments.push({
            filename: item.name,
            link: downloadURL,
          });
          setFormdata(tempFormData);
          setFilesLeftForUpload(filesLeftForUpload - 1);
        });
      });
    });
  };

  const handleUpload = ({ target: { files } }) => {
    setFormErrors({ ...formErrors, attachments: "" });
    setFilesLeftForUpload(files.length);
    let filesData = [];

    for (let i = 0; i < files.length; i++) {
      filesData.push(files[i]);
    }

    // console.log(filesData);
    upload(filesData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formdata.title === "") {
      setFormErrors({ ...formErrors, title: `${type} title can't be empty` });
      return;
    } else if (formdata.subject === "") {
      setFormErrors({ ...formErrors, subject: "Choose a subject" });
      return;
    } else if (formdata.description === "") {
      setFormErrors({ ...formErrors, description: "Write a description" });
      return;
    } else if (
      (type === "material" || type === "task") &&
      formdata.attachments.length === 0
    ) {
      setFormErrors({ ...formErrors, attachments: "Add attachment" });
      return;
    }

    let item = { ...formdata };
    const { _id, course, semester } = subjects.filter(
      (obj) => obj.name === item.subject
    )[0];
    [item.subject, item.course, item.semester] = [_id, course, semester];

    if (type === "material" || type === "doubt") {
      delete item.dueDatetime;
      delete item.points;
    }
    if (type === "doubt") {
      delete item.attachments;
    }

    console.log(item);
    if (type === "material") createNewMaterial(item, user, materialsDispatch);
    else if (type === "task") createNewTask(item, user, tasksDispatch);
    else if (type === "doubt") createNewDoubt(item, user, doubtsDispatch);

    setFormdata({
      title: "",
      description: "",
      subject: "",
      attachments: "",
      dueDatetime: "",
      points: "",
    });
  };

  return (
    <div className={"itemForm " + (onFocus ? "onFocus" : "")}>
      <div className="beforeFocus">
        <img src={profilePic || dummyProfilePic} alt="profile" />
        <input
          type="text"
          placeholder={placeholders[type]}
          onClick={() => setOnFocus(true)}
        />
      </div>

      <div className="afterFocus">
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                label={`${type.charAt(0).toUpperCase() + type.slice(1)} title`}
                value={formdata.title}
                onChange={handleChange}
                autoFocus
                variant="outlined"
                error={formErrors.title}
                helperText={formErrors.title || `Give title for your ${type}`}
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Inter",
                    fontSize: 13,
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Subject"
                name="subject"
                value={formdata.subject}
                onChange={handleChange}
                select
                required
                fullWidth
                variant="outlined"
                defaultValue={currentSubject}
                error={formErrors.subject}
                helperText={formErrors.subject || "Select subject"}
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Inter",
                    fontSize: 13,
                    fontWeight: "500",
                  },
                }}
              >
                {subjects.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formdata.description}
                onChange={handleChange}
                autoComplete="description"
                multiline
                variant="filled"
                rows={3}
                fullWidth
                required
                error={formErrors.description}
                helperText={formErrors.description || "Add a description"}
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Inter",
                    fontSize: 13,
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>

            {(type === "material" || type === "task") && (
              <Grid container item xs={12} lg={5} spacing={2}>
                <Grid item xs={12} lg={6}>
                  <LoadingButton
                    variant="contained"
                    component="label"
                    style={{ textTransform: "none" }}
                    disableElevation
                    startIcon={<PublishRoundedIcon />}
                    loading={filesLeftForUpload > 0}
                    loadingPosition="start"
                    color={formErrors.attachments ? "error" : "primary"}
                  >
                    Upload file
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleUpload}
                    />
                  </LoadingButton>

                  {formErrors.attachments ? (
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: "red",
                        marginTop: "4px",
                      }}
                    >
                      {formErrors.attachments}
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        color: "#919191",
                        marginTop: "4px",
                      }}
                    >
                      Upload attachments
                    </p>
                  )}
                </Grid>

                <Grid item xs={12} lg={6}></Grid>
              </Grid>
            )}

            {type === "task" && (
              <>
                <Grid item xs={12} lg={4}>
                  <TextField
                    name="dueDatetime"
                    fullWidth
                    label="Due date & time (optional)"
                    value={formdata.dueDatetime}
                    onChange={handleChange}
                    variant="filled"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    helperText="Mention due date with time (Optional)"
                    FormHelperTextProps={{
                      style: {
                        fontFamily: "Inter",
                        fontSize: 13,
                        fontWeight: "500",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    autoComplete="points"
                    name="points"
                    fullWidth
                    label="Points (optional)"
                    value={formdata.points}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    helperText="Points for this task"
                    FormHelperTextProps={{
                      style: {
                        fontFamily: "Inter",
                        fontSize: 13,
                        fontWeight: "500",
                      },
                    }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                style={{ marginRight: "20px", textTransform: "capitalize" }}
                onClick={() => setOnFocus(false)}
              >
                Cancel
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                style={{
                  background: "#646cff",
                  color: "#fff",
                  textTransform: "capitalize",
                }}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ItemForm;
