import { socket } from "./socket";

export const sendMessage = (message) => {
  console.log("send message : "+message);
  socket.emit("message", message);
};
