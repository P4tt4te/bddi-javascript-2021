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
import avatarImage from "./Assets/profil.svg";

export function App() {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      console.log("connect");
    });
    socket.on("users", (arg) => {
      setUsers(arg);
      console.log("users:" + arg);
    });
    socket.emit("getUsers");
    socket.on("message", (arg) => {
      console.log("new message " + arg.value);
      setMessages((laliste) => [...laliste, arg]);
    });
  }, []);

  const showHistory = () => {
    socket.on("messages", (arg) => {
      setHistoryMessages(arg);
    });
    socket.emit("getMessages");
  };

  /*
socket.on("messages", (arg) => {
    setHistoryMessages(arg);
  });
  socket.emit("getMessages");

  const userListUpdate = () => {
    socket.on("userConnection", (arg) => {
      let userlistconnection = users;
      userlistconnection.push(arg);
      console.log("userConnection :" + arg);
      setUsers(userlistconnection);
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
            <span>#💬 -général</span>
            <span>#🚀 -cryptomonnaie</span>
          </div>
        </div>
        <div className="AvatarMenu box">
          <img src={avatarImage} alt="Logo Avatar" />
          <UsernameForm
            user={{ id: socket.id, name: username }}
            onUpdate={(val) => setUsername(val)}
          />
        </div>
      </div>
      <div className="ChatContainer box">
        <div>
          <h2>UsersList : </h2>
          <UsersList users={users} />
          <h2>MessagesList : </h2>
          <MessagesList messages={messages} />
        </div>
        <div>
          <div>
            <button onClick={() => showHistory()}>Avoir l'historique</button>
            <button onClick={() => getCryptoCoin("bitcoin")}>getCryptoCoin</button>
          </div>
          <MessageForm user={{ id: socket.id, name: username }} />
        </div>
      </div>
    </div>
  );
}

export default App;
