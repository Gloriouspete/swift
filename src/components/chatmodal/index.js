"use client";

import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { timeAgo } from "../worker/page.js";
import { MdArrowBackIos, MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Log from "./log.js"
const userid = window.localStorage.getItem("userid");


export default function Chatmodal () {
  const router = useNavigate()
  const [chatlist, setChatlist] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Log();
      if (Array.isArray(response)) {
       // alert(response.length)
        setChatlist(response);
        console.log(response);
      }
      else{
        alert("oga ao")
      }
    } catch (error) {
     // router.back();
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
    const check = (dta) => {
        if (userid === dta) {
          return true;
        } else {
          return false;
        }
      };
    return(
        <>
        <section className="w-full h-auto min-h-max bg-white px-1"
            >
              {chatlist? (
                chatlist.map(
                  ({
                    chatid,
                    firstid,
                    secondid,
                    firstname,
                    secondname,
                    msg,
                    status,
                    date,
                  }) => (
                    <div
                      key={date}
                      className={`w-full h-auto border border-slate-300 px-2 items-center py-2 rounded-md cursor-pointer shadow-sm my-2 `}
                      onClick={() =>
                        router(`/chat?id=${msg.chatid}`)
                      }
                    >
                      <div className="h-12 w-12 ">
                        <img
                          src="/emoticon.png"
                          className="w-full h-full rounded-full"
                        />
                      </div>

                      <div className="flex-grow h-full bg-rd-500 flex-col flex justify-between select-none px-2">
                        <span className="h-2/6 w-full flex justify-between px-2 items-center mb-1">
                        <p className="font-intermedium text-sm whitespace-nowrap">
                        {check(firstid) ? secondname : firstname}
                          </p>
                         
                          <p className="font-intermedium text-[12px]">
                            {timeAgo(msg.date)}
                          </p>
                        </span>
                       
                        <span className="h-2/6 w-full flex justify-between px-2 items-center mt-1">
                          <span className="flex">
                            <p className={`${check(firstid) ? "bg-slate-800 dark:bg-slate-700" : "hidden"} text-[10px] font-inter mx-1 px-[6px] flex items-center rounded-sm text-white`}>
                              {check(msg.sender) ? "Me: " : null}
                            </p>
                            <p className={`${status === "seen" ? "font-inter" : "font-intermedium"} text-sm text-slate-700`}>
                              {msg.message
                                ? `${msg.message.slice(0, 19)}...`
                                : msg.message}
                            </p>
                          </span>
                          <span id="unread and time" className="flex flex-col justify-between">
                          
                          <span id="dot" className={`h-2 w-2 rounded-full ${status === "seen" || firstid === userid ? " " : "bg-red-600"}`}>

                          </span>
                          </span>
                         
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="w-full h-auto flex flex-col items-center justify-center px-3 md:rounded-xl">
                  <MdBlock size={200} className="fill-mycolor mt-20" />
                  <p className="text-lg font-intermedium text-slate-600 dark:text-gray-200">
                    No Active Messages
                  </p>
                  <p className="text-md font-inter text-slate-600 text-center dark:text-gray-200">
                    Simply Click the message button below to  Contact a new friend
                  </p>
                </div>
              )}
            </section>
        </>
    )
};

const changeIt = (text) => {
    if(text || "iyh".startsWith("https://pics")){
      return "🖼️"
    }
    else {
      return text
    }
    }
    /*

    [
  {
    _id: new ObjectId('668aa0453ce6158c778c4c21'),
    chatid: 'vgouxT',
    firstid: 'e62ecd6b-a89a-4541-82c9-ec5cc2b784e7',
    secondid: '733581fb-6d4e-4ab2-bbc3-438bf907db30',
    firstname: 'Big Daddy',
    secondname: 'Tunde Lola',
    date: 2024-07-07T14:03:49.922Z,
    __v: 0
  }
]
*/