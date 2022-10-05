import React, { useState } from "react";
import { sendMessage } from "../sendMessage";
import './MessageForm.css';

export function MessageForm({ user }) {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    sendMessage(value);
    setValue("");
    e.preventDefault();
  }

  return user !== null ? (
    <div className="MessageForm">
      <form className="MessageForm" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="MessageFormInput"
          name="messageContent"
          placeholder="Envoyer un message dans 💬 -général"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </form>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
