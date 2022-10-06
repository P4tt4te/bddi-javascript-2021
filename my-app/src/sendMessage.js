import { socket } from "./socket";

export const sendMessage = (message, room) => {
  console.log("send message : " + message);
  console.log("room: " + room);
  socket.emit("message", { type: "", value: message, room: room });
};
