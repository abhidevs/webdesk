const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
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
const groupVideoCallSocket = require("./socket/groupVideoCall");

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
app.get("/", (req, res) => res.send("Hello from Webdesk :)"));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/material", materialRoute);
app.use("/api/task", taskRoute);
app.use("/api/doubt", doubtRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/classcomment", classCommentRoute);

// sockets
groupVideoCallSocket(io);

// Port setup
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("webdesk server is running on port:" + port);
});
