import { socket } from "./socket";

export const updateUsername = (newname) => {
  console.log("updateUsername : " + newname);
  socket.emit("setUsername", newname);
};
