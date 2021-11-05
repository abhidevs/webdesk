const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const subjectRoute = require("./routes/subjects");
const materialRoute = require("./routes/materials");
const taskRoute = require("./routes/tasks");
const doubtRoute = require("./routes/doubts");
const scheduleRoute = require("./routes/schedules");
const classCommentRoute = require("./routes/classComments");

// config for dotenv
dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/material", materialRoute);
app.use("/api/task", taskRoute);
app.use("/api/doubt", doubtRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/classComment", classCommentRoute);

app.listen(8800, () => {
  console.log("webdesk server is running...");
});
