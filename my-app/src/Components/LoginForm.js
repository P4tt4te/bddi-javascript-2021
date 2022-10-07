import React, { useState } from "react";
import { updateUsername } from "../updateUsername";
import "./LoginForm.css";
import sendArrow from "../Assets/send_arrow.svg";
import logoLogin from "../Assets/logo_login.svg";
export function LoginForm({ onSubmitEvent, onUpdate }) {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    updateUsername(value);
    onUpdate(value);
    onSubmitEvent();
    e.preventDefault();
  };

  return (
    <div className="LoginFormContainer">
      <img src={logoLogin} alt="Logo Blockchat" />
      <form className="LoginForm" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="LoginFormInput"
          name="messageContent"
          placeholder="Choisis un pseudo"
          required
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <input type="image" src={sendArrow} alt="envoyer" />
      </form>
    </div>
  );
}
