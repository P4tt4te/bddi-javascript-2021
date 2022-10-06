import React from "react";
import { formatDate } from "../Helper/formatDate";
import "./MessagesList.css";

export function MessagesList({ messages, room }) {
  return messages.length > 0 ? (
    <div className="MessagesListContainer">
      {messages
        .filter((message) => message.room === room)
        .map((message) => (
          <div className="MessagesListContent box" key={message.id}>
            <div>
              <span className="MessagesListContentName">{message.user.name}</span>
              <span className="MessagesListContentDate"> - {formatDate(message.time)}</span>
            </div>
            <p className="MessagesListContentMessage">{message.value}</p>
          </div>
        ))}
    </div>
  ) : (
    <div>pas de message.</div>
  );
}
