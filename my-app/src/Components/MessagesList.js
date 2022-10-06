import React from "react";
import { formatDate } from "../Helper/formatDate";
import coinGeckoLogo from "../Assets/coingecko.svg";
import "./MessagesList.css";

export function MessagesList({ messages, room }) {
  return messages.length > 0 ? (
    <div className="MessagesListContainer">
      {messages
        .filter((message) => message.room === room)
        .map((message) => {
          if (message.value.startsWith("/price-api/")) {
            let obj = message.value.split("/");
            console.log(obj);
            return (
              <div className="MessagesListContent box" key={message.id}>
                <div>
                  <span className="MessagesListContentDate">
                    /price {obj[2]} par {message.user.name}
                  </span>
                  <div className="MessagesListContent box">
                    <div className="CryptoMessage">
                      <div className="CryptoMessageTop">
                        <div className="CryptoMessageHeader">
                          <img
                            width={48}
                            height={48}
                            src={
                              "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
                            }
                            alt="/value coin logo"
                          />
                          <p className="CryptoMessageSymbol">$ {obj[3]}</p>
                          <span className={parseFloat(obj[5]) < 0 ? "red" : "green"}>{obj[5]} %</span>
                        </div>
                        <span className="CryptoMessageRanking"># {obj[4]}</span>
                      </div>
                      <div className="CryptoMessageBottom">
                        <div className="CryptoMessageValueBottom">
                          <div className="CryptoMessageValueBox">
                            {obj[6]} €
                          </div>
                          <div className="CryptoMessageValueBox">
                            {obj[7]} $
                          </div>
                        </div>
                        <div className="CryptoMessageCoinGecko">
                          <span>powered by </span>
                          <img
                            height={50}
                            width={80}
                            src={coinGeckoLogo}
                            alt="coinGecko"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className="MessagesListContent box" key={message.id}>
              <div>
                <span className="MessagesListContentName">
                  {message.user.name}
                </span>
                <span className="MessagesListContentDate">
                  {" "}
                  - {formatDate(message.time)}
                </span>
              </div>
              <p className="MessagesListContentMessage">{message.value}</p>
            </div>
          );
        })}
    </div>
  ) : (
    <div>pas de message.</div>
  );
}
