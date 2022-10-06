import { getCryptoCoin, getCryptoWeekData } from "./Api/getCryptoCoin";
import { socket } from "./socket";

export async function sendMessage(message, room) {
  console.log("send message : " + message);
  console.log("room: " + room);
  if (message.startsWith("/price ")) {
    let text = message.split(" ");
    console.log("text :");
    console.log(text);
    let obj;
    if (text.length > 1 && text[1] !== "") {
      obj = await getCryptoCoin(text[1].toLowerCase());
    } else {
      obj = await getCryptoCoin("bitcoin");
    }
    let newmessage =
      "|price-api|" +
      obj.name +
      "|" +
      obj.symbol.toUpperCase() +
      "|" +
      obj.coingecko_rank +
      "|" +
      obj.market_data.market_cap_change_percentage_24h +
      "|" +
      obj.market_data.current_price.eur +
      "|" +
      obj.market_data.current_price.usd +
      "|" +
      obj.image.small;
    socket.emit("message", { type: "", value: newmessage, room: room });
  } else if (message.startsWith("/lastweek ")) {
    let text = message.split(" ");
    console.log("text :");
    console.log(text);
    let obj;
    let textname;
    if (text.length > 1 && text[1] !== "") {
      obj = await getCryptoWeekData(text[1].toLowerCase());
      textname = text[1];
    } else {
      obj = await getCryptoWeekData("bitcoin");
      textname = "bitcoin";
    }
    let newmessage =
      "|lastweek-api|" +
      textname +
      "|" +
      obj.prices[0][1].toFixed(5) +
      "|" +
      obj.prices[1][1].toFixed(5) +
      "|" +
      obj.prices[2][1].toFixed(5) +
      "|" +
      obj.prices[3][1].toFixed(5) +
      "|" +
      obj.prices[4][1].toFixed(5) +
      "|" +
      obj.prices[5][1].toFixed(5) +
      "|" +
      obj.prices[6][1].toFixed(5) +
      "|";
    socket.emit("message", { type: "", value: newmessage, room: room });
  } else {
    socket.emit("message", { type: "", value: message, room: room });
  }
}
