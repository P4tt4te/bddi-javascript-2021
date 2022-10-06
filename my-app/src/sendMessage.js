import { getCryptoCoin } from "./Api/getCryptoCoin";
import { socket } from "./socket";

export async function sendMessage(message, room) {
  console.log("send message : " + message);
  console.log("room: " + room);
  if (message.startsWith("/price ")) {
    let text = message.split(" ");
    console.log("text :");
    console.log(text);
    let obj;
    if(text.length > 1 && text[1] !== "") {
      obj = await getCryptoCoin(text[1]);
    } else {
      obj = await getCryptoCoin("bitcoin");
    }
    let newmessage =
      "/price-api/" +
      obj.name +
      "/" +
      obj.symbol.toUpperCase() +
      "/" +
      obj.coingecko_rank +
      "/" +
      obj.market_data.market_cap_change_percentage_24h +
      "/" +
      obj.market_data.current_price.eur +
      "/" +
      obj.market_data.current_price.usd;
    socket.emit("message", { type: "", value: newmessage, room: room });
  } else {
    socket.emit("message", { type: "", value: message, room: room });
  }
}
