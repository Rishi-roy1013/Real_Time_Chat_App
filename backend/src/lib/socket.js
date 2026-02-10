import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const emitCallEvent = (userId, event, payload) => {
  const receiverSocketId = getReceiverSocketId(userId);
  if (!receiverSocketId) {
    return false;
  }

  io.to(receiverSocketId).emit(event, payload);
  return true;
};

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  socket.data.userId = userId;
  socket.data.activeCallTarget = null;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("call:offer", ({ to, offer, callType, caller }) => {
    socket.data.activeCallTarget = to;

    const delivered = emitCallEvent(to, "call:offer", {
      fromUserId: userId,
      offer,
      callType,
      caller,
    });

    if (!delivered) {
      socket.data.activeCallTarget = null;
      socket.emit("call:unavailable", {
        fromUserId: to,
        reason: "User is offline",
      });
    }
  });

  socket.on("call:answer", ({ to, answer }) => {
    socket.data.activeCallTarget = to;
    emitCallEvent(to, "call:answer", {
      fromUserId: userId,
      answer,
    });
  });

  socket.on("call:ice-candidate", ({ to, candidate }) => {
    emitCallEvent(to, "call:ice-candidate", {
      fromUserId: userId,
      candidate,
    });
  });

  socket.on("call:decline", ({ to }) => {
    socket.data.activeCallTarget = null;
    emitCallEvent(to, "call:decline", {
      fromUserId: userId,
    });
  });

  socket.on("call:busy", ({ to }) => {
    socket.data.activeCallTarget = null;
    emitCallEvent(to, "call:busy", {
      fromUserId: userId,
    });
  });

  socket.on("call:end", ({ to }) => {
    socket.data.activeCallTarget = null;
    emitCallEvent(to, "call:end", {
      fromUserId: userId,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    const activeCallTarget = socket.data.activeCallTarget;
    if (activeCallTarget) {
      emitCallEvent(activeCallTarget, "call:end", {
        fromUserId: userId,
      });
    }

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
