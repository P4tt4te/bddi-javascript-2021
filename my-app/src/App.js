import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { UsersList } from "./Components/UsersList";
import { MessagesList } from "./Components/MessagesList";
import { sendMessage } from "./sendMessage";
import "./App.css";
import { getCryptoCoin } from "./Api/getCryptoCoin";
import { MessageForm } from "./Components/MessageForm";
import { UsernameForm } from "./Components/UsernameForm";
import logoImage from "./Assets/logo.svg";
import addImage from "./Assets/add.svg";
import avatarImage from "./Assets/profil.svg";

export function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState(null);
  const [chatModal, setChatModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

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
      setMessages((laliste) => [...laliste, arg]);
    };
    socket.on("message", messageListener);

    const userConnectionListener = (arg) => {
      console.log("userConnection :" + arg);

      setUsers((prevUsers) => [...prevUsers, arg]);
    };
    socket.on("userConnection", userConnectionListener);

    const userDisconnectionListener = (arg) => {
      const filteredUsers = users.filter((user) => arg.id === user.id);
      setUsers(filteredUsers);
    };
    socket.on("userDisconnection", userDisconnectionListener);

    return () => {
      socket.off("message", messageListener);
      socket.off("userConnection", userConnectionListener);
      socket.off("userDisconnection", userDisconnectionListener);
    };
  }, []);

  useEffect(() => {
    const updateUsername = (arg) => {
      const newUsers = users;
      console.log(arg);
      console.log(users);
      const indexNewUser = users.findIndex((user) => user.id === arg.id);
      console.log('index new user : '+indexNewUser);
      newUsers[indexNewUser] = arg;
      setUsers(newUsers);
    };
    socket.on("updateUsername", updateUsername);

    return () => socket.off("updateUsername", updateUsername);
  },[users]);

  const showHistory = () => {
    socket.on("messages", (arg) => {
      setHistoryMessages(arg);
    });
    socket.emit("getMessages");
  };

  /*

  const userListUpdate = () => {
    socket.on("userConnection", (arg) => {
      console.log("userConnection :" + arg);
    
      setUsers((prevUsers) => {
        return [...prevUsers, arg];
      });
    });

    socket.on("userDisconnection", (arg) => {
      const filteredUsers = users.filter((user) => arg.id !== user.id);
      setUsers(filteredUsers);
    });
  };
  */

  useEffect(() => {
    console.log("My username = " + username);
  }, [username]);

  useEffect(() => {
    console.log("Messages list :" + messages);
  }, [messages]);

  return (
    <div className="App">
      <div className="Menu">
        <div className="MenuTitle">
          <img src={logoImage} alt="logo" />
          <h1 className="MenuTitleText">Blockchat</h1>
        </div>
        <div className="ChannelMenu box">
          <span>Liste des channels :</span>
          <div className="ChannelMenuList">
            <div className="ChannelMenuListElement">
              <span>#💬 -général</span>
            </div>
            <div className="ChannelMenuListElement">
              <span>#🚀 -cryptomonnaie</span>
            </div>
          </div>
        </div>
        <div
          className={avatarModal ? "AvatarMenu on box" : "AvatarMenu off box"}
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
          <MessagesList messages={messages} />
        </div>
        <div className="ChatContainerAction">
          <div
            className={
              chatModal
                ? "ChatContainerActionModal on"
                : "ChatContainerActionModal off"
            }
          >
            <button onClick={() => showHistory()}>Avoir l'historique</button>
            <button onClick={() => getCryptoCoin("bitcoin")}>
              getCryptoCoin
            </button>
          </div>
          <div
            className="ChatContainerActionAdd"
            onClick={() => setChatModal(!chatModal)}
          >
            <img src={addImage} alt="Plus options" />
          </div>
          <MessageForm user={{ id: socket.id, name: username }} />
        </div>
      </div>
    </div>
  );
}

export default App;
