import React, { useEffect, useState } from "react";
import { sendMessage } from "../sendMessage";
import "./MessageForm.css";
import sendArrow from "../Assets/send_arrow.svg";
import addImage from "../Assets/add.svg";

export function MessageForm({ user, room }) {
  const [value, setValue] = useState("");
  const [chatModal, setChatModal] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Envoyer un message dans 💬 -général"
  );

  const testValue = (word) => {
    if (chatModal) {
      setChatModal(false);
    }
    if (word.startsWith("/") && !word.includes(" ")) {
      commandFilter(word);
    } else {
      setValue(word);
    }
  };

  const commandFilter = (word) => {
    console.log("commandFilter");
    setValue(word);
  };

  useEffect(() => {
    switch (room) {
      case "general":
        setPlaceholder("Envoyer un message dans 💬 -général");
        break;
      case "cryptoBlockChat":
        setPlaceholder("Envoyer un message dans 🚀 -cryptomonnaie");
        break;
      case "nftBlockChat":
        setPlaceholder("Envoyer un message dans 🖼️ -nft");
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
            ? `ChatContainerActionModal ${room} on`
            : "ChatContainerActionModal off"
        }
      >
        {room !== "general" ? (
          <>
            <div
              onClick={() => testValue("/price bitcoin")}
              className="ChatContainerActionModalBlock"
            >
              <span className="ChatContainerActionModalTitle">
                /price *nom*
              </span>
              <div>
                <p>Information sur une cryptomonnaie</p>
                <span>ex: bitcoin,litecoin,dogecoin...</span>
              </div>
            </div>
            <div
              onClick={() => testValue("/lastweek bitcoin")}
              className="ChatContainerActionModalBlock"
            >
              <span className="ChatContainerActionModalTitle">
                /lastweek *nom*
              </span>
              <div>
                <p>Les valeurs (EUR/crypto) des 7 derniers jours.</p>
                <span>ex: bitcoin,litecoin,dogecoin...</span>
              </div>
            </div>
          </>
        ) : (
          <div className="ChatContainerActionModalBlock">les commandes ne sont pas dispo dans général...</div>
        )}
      </div>
      <div
        className="ChatContainerActionAdd buttonAnimation"
        onClick={() => setChatModal(!chatModal)}
      >
        <img src={addImage} alt="Plus options" />
      </div>

      <form className="MessageForm" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          className="MessageFormInput"
          name="messageContent"
          required
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
