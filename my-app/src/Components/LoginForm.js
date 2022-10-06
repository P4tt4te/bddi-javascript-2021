import React, { useState } from "react";
import { updateUsername } from "../updateUsername";
import './LoginForm.css';
import sendArrow from "../Assets/send_arrow.svg";

export function LoginForm({onSubmitEvent, onUpdate}) {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    updateUsername(value);
    onUpdate(value);
    onSubmitEvent();
    e.preventDefault();
  }

  return (
    <div className="LoginFormContainer">
      <form className="LoginForm" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="LoginFormInput"
          name="messageContent"
          placeholder="Envoyer un message dans 💬 -général"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <input type="image" src={sendArrow} alt="envoyer" />
      </form>
    </div>
  );
}
