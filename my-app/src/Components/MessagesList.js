import React from "react";
import { formatDate } from "../Helper/formatDate";

export function MessagesList({messages}) {

  return messages !== null ? (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
            <span>Date : {formatDate(message.time)}</span>
            <p>{ message.value }</p>
        </div>
      ))}
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
