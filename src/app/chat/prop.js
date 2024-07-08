import { io } from "socket.io-client";
const userd =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;
const SERVER_URL = "https://swiftback.onrender.com";
const socket = io(SERVER_URL);

export default async function Connection (chatid){
    socket.emit("start-conversation", chatid);
    return true
}