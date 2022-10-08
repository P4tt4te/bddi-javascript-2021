import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { UsersList } from "./Components/UsersList";
import { MessagesList } from "./Components/MessagesList";
import "./App.css";
import { LoginForm } from "./Components/LoginForm";
import { MessageForm } from "./Components/MessageForm";
import { UsernameForm } from "./Components/UsernameForm";
import logoImage from "./Assets/logo.svg";
import clockImage from "./Assets/clock.svg";
import avatarImage from "./Assets/profil.svg";

export function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState(null);
  const [historyMessagesLoading, setHistoryMessagesLoading] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [room, setRoom] = useState("general");

  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("users", (arg) => {
      setUsers(arg);
    });
    socket.emit("getUsers");

    const messageListener = (arg) => {
      setMessages((laliste) => [...laliste, arg]);
    };
    socket.on("message", messageListener);

    const userConnectionListener = (arg) => {
      setUsers((prevUsers) => [...prevUsers, arg]);
    };
    socket.on("userConnection", userConnectionListener);

    socket.emit("joinRoom", "cryptoBlockChat");

    return () => {
      socket.off("message", messageListener);
      socket.off("userConnection", userConnectionListener);
    };
  }, []);

  useEffect(() => {
    const updateUsername = (arg) => {
      const newUsers = users;

      const indexNewUser = users.findIndex((user) => user.id === arg.id);

      newUsers[indexNewUser] = arg;
      setUsers(newUsers);
    };
    socket.on("updateUsername", updateUsername);

    const userDisconnectionListener = (arg) => {
      const filteredUsers = users.filter((user) => arg.id !== user.id);
      setUsers(filteredUsers);
    };
    socket.on("userDisconnection", userDisconnectionListener);

    return () => {
      socket.off("updateUsername", updateUsername);
      socket.off("userDisconnection", userDisconnectionListener);
    };
  }, [users]);

  const showHistory = () => {
    setHistoryMessagesLoading(true);
    socket.on("messages", (arg) => {
      setHistoryMessages(arg);
    });
    socket.emit("getMessages");
  };

  useEffect(() => {}, [username]);

  useEffect(() => {}, [messages]);

  return (
    <div className="App">
      {login ? (
        <>
          <div className="Menu">
            <div className="MenuTitle">
              <img src={logoImage} alt="logo" />
            </div>
            <div className="ChannelMenu box">
              <span>Liste des channels :</span>
              <div className="ChannelMenuList">
                <div
                  onClick={() => setRoom("general")}
                  className={
                    room === "general"
                      ? "ChannelMenuListElement active"
                      : "ChannelMenuListElement"
                  }
                >
                  <span>#💬 -général</span>
                </div>
                <div
                  onClick={() => setRoom("cryptoBlockChat")}
                  className={
                    room === "cryptoBlockChat"
                      ? "ChannelMenuListElement active"
                      : "ChannelMenuListElement"
                  }
                >
                  <span>#🚀 -cryptomonnaie</span>
                </div>
              </div>
            </div>
            <div
              className={
                avatarModal ? "AvatarMenu on box" : "AvatarMenu off box"
              }
            >
              <div className="AvatarMenuList box">
                <h2 className="AvatarMenuListHeader">Utilisateurs : </h2>
                <UsersList users={users} />
              </div>
              <div className="AvatarMenuAction">
                <img
                  onClick={() => setAvatarModal(!avatarModal)}
                  src={avatarImage}
                  className="buttonAnimation"
                  alt="Logo Avatar"
                />
                <UsernameForm
                  user={{ id: socket.id, name: username }}
                  onUpdate={(val) => setUsername(val)}
                />
              </div>
            </div>
          </div>
          <div className="ChatContainer box">
            <div className="ChatContainerContent">
              {historyMessages ? (
                <>
                  <MessagesList messages={historyMessages} room={room} />
                </>
              ) : (
                <div className="historyMessageContainer">
                  <div
                    onClick={() => showHistory()}
                    className="historyMessageButton buttonAnimation"
                  >
                    <img
                      width={20}
                      height={20}
                      src={clockImage}
                      alt="horloge"
                    />
                    <p className="historyMessage">
                      Charger tous les messages ancien ?
                    </p>
                  </div>
                </div>
              )}
              {historyMessagesLoading && (
                <div className="historyMessageContainer">
                  <div className="historyMessageButton">
                    <p className="historyMessage">Chargement...</p>
                  </div>
                </div>
              )}

              <MessagesList messages={messages} room={room} />
            </div>
            <div className="ChatContainerAction">
              <MessageForm
                user={{ id: socket.id, name: username }}
                room={room}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="LoginContainer">
          <div className="LoginContainerBlock">
            <span>Blockchat</span>
            <LoginForm
              onSubmitEvent={() => setLogin(true)}
              onUpdate={(val) => setUsername(val)}
            />
            <span>Edmy Inc. (72h project)</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
