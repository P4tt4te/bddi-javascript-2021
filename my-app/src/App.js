import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { UsersList } from "./Components/UsersList";
import { MessagesList } from "./Components/MessagesList";
import "./App.css";
import { LoginForm } from "./Components/LoginForm";
import { MessageForm } from "./Components/MessageForm";
import { UsernameForm } from "./Components/UsernameForm";
import logoImage from "./Assets/logo.svg";
import avatarImage from "./Assets/profil.svg";


export function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState(null);
  const [chatModal, setChatModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [room, setRoom] = useState("general");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      console.log("connect");
    });
    socket.on("users", (arg) => {
      setUsers(arg);
      console.log("users:");
      console.log(arg);
    });
    socket.emit("getUsers");

    const messageListener = (arg) => {
      console.log("new message " + arg.value);
      console.log("argid " + arg.id);
      console.log("room : " + arg.room);
      setMessages((laliste) => [...laliste, arg]);
    };
    socket.on("message", messageListener);

    const userConnectionListener = (arg) => {
      console.log("userConnection :" + arg);

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
      console.log(arg);
      console.log(users);
      const indexNewUser = users.findIndex((user) => user.id === arg.id);
      console.log("index new user : " + indexNewUser);
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
    socket.on("messages", (arg) => {
      setHistoryMessages(arg);
    });
    socket.emit("getMessages");
  };

  useEffect(() => {
    console.log("My username = " + username);
  }, [username]);

  useEffect(() => {
    console.log("Messages list :" + messages);
  }, [messages]);

  return (
    <div className="App">
      {login ? (
        <>
          <div className="Menu">
            <div className="MenuTitle">
              <img src={logoImage} alt="logo" />
              <h1 className="MenuTitleText">Blockchat</h1>
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
              {historyMessages && (
                <>
                  <h2>MessagesHistoryList :</h2>
                  <MessagesList messages={historyMessages} />
                </>
              )}
              <h2>MessagesList : </h2>
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
