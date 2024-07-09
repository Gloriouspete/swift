"use client";
import { FaCoins, FaPen  } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdBlock,
  MdChatBubble,
  MdOutlineSettings,
  MdSettings,
  MdVerified,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Block, Fetchp, Chat } from "./log.js";
import Loader from "../../components/loader/loader.jsx";
import { io } from "socket.io-client";
const SERVER_URL = "https://swiftback.onrender.com";
const socket = io(SERVER_URL);
export default function Viewprofile() {
  const [searchparam, setsearchparam] = useSearchParams();
  const fileInput = useRef(null);
  const router = useNavigate();
  const [imageurl, setImageurl] = useState("/emoticon.png");
  const [load, setLoad] = useState("");
  const [name, setName] = useState(`. . . . .`);
  const [coin, setCoin] = useState(0);
  const [userid, setUserid] = useState("");
  const [username, setusername] = useState("");

  const sendMessage = (data) => {
    console.log("got to send", data);
    const hydon = {
      chatid: data.chatid,
      sender: data.userid,
      receiver: userid,
      type: "message",
      message: "🖐🏿",
    };
    socket.emit("message", hydon);
    console.log("got to send again", hydon);
  };

  const fetchData = async () => {
    const queryValue = searchparam.get("user")
    if(!queryValue){
      alert("No params")
    }
    setLoad(true);
    try {
      const response = await Fetchp(queryValue.toLowerCase().trim());
      if (response.success) {
        const data = response.data;
        setName(`${data.displayname}`);
        setusername(data.username);
        setUserid(data.userid)
      }
      else{
        router(-1)
      }
    } catch (error) {
      //router("/login");
    } finally {
      setLoad(false);
    }
  };
 
  const handleChat = async() => {
    setLoad(true)
    if(!userid){
      alert("A required Input is missing, You are advised to reload the page")
      return
    }
    try{
      const response = await Chat(name,userid);
      if(response.success){
        const result = response.data;
        if(response.record === "new"){
          alert(response.message)
          sendMessage(result)
          router(`/chat?id=${result.chatid}`)
        }
        else {
          router(`/chat?id=${result}`)
        }
      }
      else{
        alert(response.message)
      }
    }
    catch(error){
      if(error && error.message){
        alert(error.message)
      }
      else{
        alert("Try again later")
      }
    }
    finally{
      setLoad(false)
    }
  }

  const handleBlock = async() => {
    setLoad(true)
    if(!userid){
      alert("A required Input is missing, You are advised to reload the page")
      return
    }
    try{
      const response = await Block(userid);
        alert(response.message)
    }
    catch(error){
      if(error && error.message){
        alert(error.message)
      }
      else{
        alert("Try again later")
      }
    }
    finally{
      setLoad(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className="w-screen flex flex-col h-auto min-h-screen bg-gray-900 items-center ">
        
        <main className="w-screen flex flex-col items-center min-h-screen md:min-h-max h-auto px-1 md:w-3/5 lg:w-2/5  rounded-md md:mt-4 bg-white lol:bg-gray-900 md:border">
          <header
            aria-label="profile header"
            className="w-full h-10 flex justify-between items-center bg-blue-0 px-2"
          >
            <span className="flex items-center">
              <MdArrowBackIos
                size={17}
                className="fill-black lol:fill-white"
                onClick={() => router(-1)}
              />
              <p className="text-md font-intermedium">Profile</p>
            </span>
            <button
              onClick={() => handleBlock()}
              className="w-auto h-auto bg-red-600 text-white font-intermedium text-sm rounded-full px-3 py-1"
            >
              Block
            </button>
          </header>

          <div
            aria-label="picture"
            className="w-auto h-auto flex-col p-3 mt-3 items-center flex"
          >
            <div className="relative rounded-full border-2 border-mycolor w-28 h-28 bg-red-500">
            
              <img
                src={imageurl || "/emoticon.png"}
                className="rounded-full w-full h-full"
              />
           
            </div>

            <span className="flex items-center flex-col">
              <p className="text-lg font-interbold text-center mt-1">
                {name}{" "}
              </p>
              <p className="text-sm font-inter text-center mt-1">
                @{username}{" "}
              </p>
             
            </span>
          </div>
          <main className="w-full flex flex-col items-center min-h-screen h-auto px-1 pb-3 lol:text-gray-100 relative">
        <div className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300 w-full  items-center py-4 cursor-pointer ">
          <div className="flex w-full h-auto py-1 shadow-sm justify-around border rounded-md">
            <span className="flex flex-col items-center" onClick={() => handleChat()}>
              <span className="bg-blue-100 rounded-full w-auto h-auto flex items-center justify-center">
              <MdChatBubble size={25} className="fill-blue-600 bg-blue-100 m-2 rounded-full" />
              </span>
              <p className="text-sm font-intermedium">Chat</p>
          
            </span>
            <span className="flex flex-col items-center" onClick={() => handleBlock()}>
            <span className="bg-red-100 rounded-full w-auto h-auto flex items-center justify-center">
             <MdBlock size={25} className="fill-red-600 bg-red-100 rounded-full m-2" />
             </span>
             <p className="text-sm font-intermedium">Block</p>
            </span>

          </div>
        </div>
      </main>
        </main>
      </div>
      {load && <Loader />}
     
    </>
  );
}
