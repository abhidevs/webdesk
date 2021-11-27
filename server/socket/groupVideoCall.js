const groupVideoCallSocket = (io) => {
  // socket logic
  const users = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("join room", (info) => {
      const { roomID, ...userInfo } = info;
      // console.log(roomID, userInfo);

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
      const usersInThisRoom = users[roomID].filter(
        (user) => user.socketID !== socket.id
      );
      // console.log(usersInThisRoom, users);
      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload) => {
      const roomID = socketToRoom[payload.callerID];
      const userInfo = users[roomID].find(
        (user) => user.socketID === payload.callerID
      );
      // console.log("sending signal log", roomID, userInfo);
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
        room = room.filter((user) => user.socketID !== socket.id);
        users[roomID] = room;
      }

      socket.broadcast.emit("user left", socket.id);
    });
  });
};

module.exports = groupVideoCallSocket;
