import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { UsersList } from "./Components/UsersList";
import { MessagesList } from "./Components/MessagesList";
import { sendMessage } from "./sendMessage";
import "./App.css";
import { MessageForm } from "./Components/MessageForm";

export function App() {
  const [connection, setConnection] = useState(false);
  const [users, setUsers] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      setConnection(true);
      socket.on("users", (arg) => {
        setUsers(arg);
      });
      socket.on("messages", (arg) => {
        setMessages(arg);
      });
      socket.on("message", (arg) => {
        let messageslist = messages;
        messageslist.push(arg);
        setMessages(messageslist);
      });
      socket.emit("getUsers");
      socket.emit("getMessages");
    });
  }, []);

  return (
    <div className="App">
      <h2>UsersList : </h2>
      <UsersList users={users} />
      <h2>MessagesList : </h2>
      <MessagesList messages={messages} />
      {socket && (
        <>
          <button
            onClick={() =>
              sendMessage({ id: "sdfdsf", name: "ahouioui" }, "un test message")
            }
          >
            Test message
          </button>
          <MessageForm user={{ id: "sdfdsf", name: "ahouioui" }} />
        </>
      )}
    </div>
  );
}

export default App;
