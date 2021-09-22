const uuidv4 = require("uuid").v4;

const messages = new Set();
const usersSockets = new Map();

const defaultUser = {
  id: uuidv4(),
  name: "Anonymous",
};

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = socket.id;
    this.name = "Anonymous";

    usersSockets.set(socket, { id: this.id, name: this.name });

    // On connection, send a user-connection event containing user info
    this.sendNewUser(this.id, this.name);

    socket.on("getUsers", () => this.sendUsers());
    socket.on("setUsername", (name) => this.setUsername(name));
    socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value) => this.handleMessage(value));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendUsers() {
    const users = [];
    usersSockets.forEach((value) => users.push(value));
    this.socket.emit("users", users);
  }

  // Used on new client connection
  sendNewUser(id, name) {
    this.io.sockets.emit("userConnection", { id, name });
  }

  // Used on new client disconnection
  sendFormerUser() {
    this.io.sockets.emit("userDisconnection", { id: this.id, name: this.name });
  }

  setUsername(name) {
    const user = usersSockets.get(this.socket);
    const newUser = { ...user, name };
    usersSockets.set(this.socket, newUser);
    this.io.sockets.emit("updateUsername", newUser);
  }

  sendMessage(message) {
    this.io.sockets.emit("message", message);
  }

  getMessages() {
    const msgs = [];
    messages.forEach((message) => msgs.push(message));
    this.socket.emit("messages", msgs);
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: usersSockets.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);
  }

  disconnect() {
    usersSockets.delete(this.socket);
    this.sendFormerUser();
  }
}

function chat(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = chat;
