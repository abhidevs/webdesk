const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
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
const { userInfo } = require("os");

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

// socket logic
const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", (info) => {
    const {roomID, ...userInfo} = info;
    console.log(roomID, userInfo);

    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 5) {
        console.log("room full, can't handle more users");
        socket.emit("room full");
        return;
      }
      userInfo.socketID = socket.id;
      users[roomID].push(userInfo);
    } else {
      userInfo.socketID = socket.id;
      users[roomID] = [userInfo];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((user) => user.socketID !== socket.id);
    console.log(usersInThisRoom, users);
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    const roomID = socketToRoom[payload.callerID];
    const userInfo = users[roomID].find((user) => user.socketID === payload.callerID);
    console.log("sending signal log", roomID, userInfo);
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      userInfo,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });
  
  socket.on("sending message", (payload) => {
    io.to(payload.userToSignal).emit("received message", {
      message: payload.message,
      senderID: payload.senderID,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

// Port setup
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("webdesk server is running on port:" + port);
});
