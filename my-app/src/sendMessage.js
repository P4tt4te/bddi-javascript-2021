import { socket } from "./socket";
import { getCryptoCoin } from "./Api/getCryptoCoin";

export const sendMessage = (user, message) => {

  return socket.emit("message", {
    id: "sdfsdfsdfdsf",
    user: { id: user.id, name: user.name },
    value: message,
    time: Date.now(),
  });
};
