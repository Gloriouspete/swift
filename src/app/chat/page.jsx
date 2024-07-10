"use client";
import { useState, useEffect, Suspense } from "react";
import { timeAgo } from "../../components/worker/page.js";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useSearchParams,useNavigate } from "react-router-dom";
import ChatScreen from "../../components/chatscreen/chatscreen.jsx";
import Loader from "../../components/loader/loader";
import { Log, Profile,Info } from "./log.js";
import { io } from "socket.io-client";
import Connection from "./prop.js";
const userd = window.localStorage.getItem("userid");
const SERVER_URL = "https://swiftback.onrender.com";
const socket = io(SERVER_URL);

export default function Chat() {
  const [load,setLoad] = useState(false)
  const router = useNavigate();
  const [searchparam, setsearchparam] = useSearchParams();
  const [msgArray, setMsgArray] = useState([]);
  const [advert, setAdvert] = useState("");
  const [chat, setChat] = useState("");
  const [title, setTitle] = useState("");
  const [posterid, setPoster] = useState("");
  const [otheruser, setOther] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [image, setImage] = useState("");
  const [name,setName] = useState("")
  const [report,setReport] = useState(false)

  const updateStatus = async (chated, realsendered) => {
      const updatedata = {
        roomid: chated,
        sender: realsendered,
      };
      socket.emit("readreceipt", updatedata);
  };
  socket.on("message", (data) => {
    if (data.sender !== userd) {
      setMsgArray((prevmessage) => [...prevmessage, data]);
    }
  });
 
  const FetchData = async (id) => {
    setLoad(true)
    await Connection(id)
    try {
      const response = await Log(id);
      if (Array.isArray(response)) {
        setMsgArray(response);
        if(response[response.length - 1].sender !== userd){
          updateStatus(id, response[response.length - 1].sender);
        }
      } else {
       // router.back()
      }
    } catch (error) {
      // router.back()
    }
    try {
      const response = await Info(id);
      if(response.firstid === userd){
        setName(response.secondname)
       setImage(response.secondid)
       setOther(response.secondid)
      }
      else{
        setName(response.firstname)
        setImage(response.firstid)
        setOther(response.firstid)
      }
    } catch (error) {
     // router.back()
    }  finally {
       updateStatus()
      setLoad(false);
    }
  };

  const search = async () => {
    try {
      const chatid = searchparam.get("id");

      if (chatid === "") {
        alert("Chat id is empty, Kindly go back")
        //router.back();
        return;
      }
     
      setChat(chatid);
      FetchData(chatid,);
    } catch (error) {
     
      // router.back();
    }
  };

  const deletemsg = (ide) => {
    const newArray = msgArray.filter((item) => item._id !== ide);
    setMsgArray(newArray);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      if (data.sender !== userd) {
        setMsgArray((prevmessage) => [...prevmessage, data]);
      }
    });

    socket.on("readreceipt", (data) => {
      setMsgArray(
        msgArray.map((message) => {
          if (data === userd && message.status !== "seen") {
            return { ...message, status: "seen" };
          }
          return message;
        })
      );
    });
    return () => {
      socket.off("message");
    };
  }, [socket, msgArray]);

  useEffect(() => {
    search();
    updateStatus();
    socket.emit("connection", "love");
  }, []);

  const handleSubmit = async (data) => {
    const currentDate = new Date();
    const hydon = {
      chatid: chat,
      message: data.text,
      type: data.type,
      receiver: otheruser,
      sender: userd,
      status: "sent",
      time: currentDate.toISOString(),
    };
    socket.emit("message", hydon);
    setMsgArray((prevmessage) => [...prevmessage, hydon]);
    return;
  };


  return (
    <>
    <main className="w-screen h-screen flex flex-col items-center scrollbar-hide">
    <main className="w-screen h-screen min-h-max flex bg-gray-900 justify-between scrollbar-hide">
      <main className="w-screen min-h-max h-auto flex flex-col items-center lg:w-3/4 relative md:border overflow-x-auto scrollbar-hide bg-white">
        <header className="w-full h-auto px-2 py-2 flex items-center justify-between border-b absolute top-0 bg-white ">
          <span className="flex items-center md:hidden" onClick={() => router(-1)}>
            <MdArrowBackIos size={20} className="" />
          </span>
          <span
            className="flex px-2 flex-grow justify-start items-center"
            onClick={() => router(`/viewprofile?user=${otheruser}`)}
          >
            <img src="/emoticon.png" className="w-8 h-8 rounded-full mx-2" />
            <span className="">
              <p className="font-interbold text-center text-md">{name?.slice(0,14)}</p>
              <p className="font-inter text-green-500 text-cente text-sm mx-">
                {currency} {price}
              </p>
            </span>
          </span>
          <span className="">
            <BsThreeDotsVertical size={25} className="mx-1" onClick={() => setReport(true)} />
          </span>
        </header>
        <ChatScreen
          submit={(data) => handleSubmit(data)}
          receivedData={msgArray}
          optiondelete={(ide) => deletemsg(ide)}
        />
      </main>
    </main>
    </main>
    
      {load && <Loader />}
   
    </>
  );
}
