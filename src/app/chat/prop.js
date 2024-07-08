import { io } from "socket.io-client";
const userd =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;
const SERVER_URL = "http://192.168.1.154:8080";
const socket = io(SERVER_URL);

export default async function Connection (chatid){
    socket.emit("start-conversation", chatid);
    return true
}