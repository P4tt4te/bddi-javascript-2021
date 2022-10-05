import React, { useState } from "react";
import { sendMessage } from "../sendMessage";

export function MessageForm({ user }) {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    sendMessage(value);
    setValue("");
    e.preventDefault();
  }

  return user !== null ? (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="messageContent">Zone de message :</label>
        <input
          type="text"
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
