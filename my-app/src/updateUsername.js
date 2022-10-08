import { socket } from "./socket";

export const updateUsername = (newname) => {
  
  socket.emit("setUsername", newname);
};
