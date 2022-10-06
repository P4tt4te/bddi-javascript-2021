import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../Helper/formatDate";
import coinGeckoLogo from "../Assets/coingecko.svg";
import "./MessagesList.css";

export function MessagesList({ messages, room }) {
  return messages.length > 0 ? (
    <div className="MessagesListContainer">
      {messages
        .filter((message) => message.room === room)
        .map((message) => {
          if (message.value.startsWith("|price-api|")) {
            let obj = message.value.split("|");
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
                            src={obj[8]}
                            alt="/value coin logo"
                          />
                          <p className="CryptoMessageSymbol">$ {obj[3]}</p>
                          <span
                            className={parseFloat(obj[5]) < 0 ? "red" : "green"}
                          >
                            {obj[5]} %
                          </span>
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
                            height={30}
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
          if (message.value.startsWith("|lastweek-api|")) {
            let obj = message.value.split("|");
            console.log(obj);

            const data = [
              {
                name: "Lun",
                uv: obj[3],
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Mar",
                uv: obj[4],
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Mer",
                uv: obj[5],
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Jeu",
                uv: obj[6],
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Ven",
                uv: obj[7],
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Sam",
                uv: obj[8],
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Dim",
                uv: obj[9],
                pv: 4300,
                amt: 2100,
              },
            ];

            return (
              <div className="MessagesListContent box" key={message.id}>
                <div>
                  <span className="MessagesListContentDate">
                    /lastweek {obj[2]} par {message.user.name}
                  </span>
                  <div className="MessagesListContent box">
                    <div className="CryptoMessage">
                      <div className="ChartContainer">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="uv"
                              stroke="#ffffff"
                              fill="#ffffffa8"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="CryptoGraphBottom">
                        <div className="CryptoMessageCoinGecko">
                          <span>powered by </span>
                          <img
                            height={30}
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
