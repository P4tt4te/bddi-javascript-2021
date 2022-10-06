import React from "react";
import { formatDate } from "../Helper/formatDate";
import "./MessagesList.css";

export function MessagesList({messages}) {

  return messages.length > 0 ? (
    <div className="MessagesListContainer">
      {messages.map((message) => (
        <div className="MessagesListContent box" key={message.id}>
            <span>Date : {formatDate(message.time)}</span>
            <span> par {message.user.name}</span>
            <p>{ message.value }</p>
        </div>
      ))}
    </div>
  ) : (
    <div>pas de message.</div>
  );
}
