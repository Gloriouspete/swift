import { io } from "socket.io-client";
const userd = window.localStorage.getItem("userid");
const SERVER_URL = "https://swiftback.onrender.com";
const socket = io(SERVER_URL);

export default async function Connection(chatid, userid) {
  socket.emit("start-conversation", { chatid: chatid, userid: userid });
  return true;
}
