import React, { useEffect, useState } from "react";
import { sendMessage } from "../sendMessage";
import "./MessageForm.css";
import { getCryptoCoin } from "../Api/getCryptoCoin";
import sendArrow from "../Assets/send_arrow.svg";
import addImage from "../Assets/add.svg";
import cryptoDataImage from "../Assets/cryptodata_logo.svg";

export function MessageForm({ user, room }) {
  const [value, setValue] = useState("");
  const [chatModal, setChatModal] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Envoyer un message dans 💬 -général"
  );

  const testValue = (word) => {
    if(word.startsWith("/") && !word.includes(" ")) {
      commandFilter(word);
    } else {
      setValue(word);
    }
  }

  const commandFilter = (word) => {
    console.log("commandFilter");
    setValue(word);
  }

  useEffect(() => {
    switch (room) {
      case "general":
        setPlaceholder("Envoyer un message dans 💬 -général");
        break;
      case "cryptoBlockChat":
        setPlaceholder("Envoyer un message dans 🚀 -cryptomonnaie");
        break;
      default:
        setPlaceholder("Envoyer un message...");
    }
  }, [room]);

  const onSubmit = (e) => {
    //regarder par rapport au chargement
    e.preventDefault();
    sendMessage(value, room);
    setValue("");
    
  };

  return user !== null ? (
    <div className="MessageFormContainer">
      <div
        className={
          chatModal
            ? "ChatContainerActionModal on"
            : "ChatContainerActionModal off"
        }
      >
        <button onClick={() => getCryptoCoin("bitcoin")}>getCryptoCoin</button>
        <div className="ChatContainerActionModalBlock">
          <img src={cryptoDataImage} alt="CryptoData logo" />
          <div>
            <span>CryptoData</span>
            <p>Information sur une cryptomonnaie</p>
          </div>
        </div>
      </div>
      <div
        className="ChatContainerActionAdd"
        onClick={() => setChatModal(!chatModal)}
      >
        <img src={addImage} alt="Plus options" />
      </div>

      <form className="MessageForm" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="MessageFormInput"
          name="messageContent"
          placeholder={placeholder}
          onChange={(e) => testValue(e.target.value)}
          value={value}
        />
        <input type="image" src={sendArrow} alt="envoyer" />
      </form>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}
