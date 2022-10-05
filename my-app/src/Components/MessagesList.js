import React from "react";
import { formatDate } from "../Helper/formatDate";

export function MessagesList({messages}) {

  return messages.length > 0 ? (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
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
