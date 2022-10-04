import { socket } from "./socket";

export const sendMessage = (user, message) => {
  console.log(Date.now());

  return socket.emit("message", {
    id: "sdfsdfsdfdsf",
    user: { id: user.id, name: user.name },
    value: message,
    time: Date.now(),
  });
};
