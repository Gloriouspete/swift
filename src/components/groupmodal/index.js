"use client";

import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { timeAgo } from "../worker/page.js";
import { MdArrowBackIos, MdBlock, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Log from "./log.js"
const userid =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;


export default function Groupmodal () {
  const router = useNavigate()
  const [chatlist, setChatlist] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Log();
      if (Array.isArray(response)) {
       // alert(response.length)
        setChatlist(response);
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
                    _id,
                    image,
                    name,
                    members,
                    date,
                  }) => (
                    <div
                      key={date}
                      className="w-full h-auto border border-slate-300 px-2 items-center flex py-2 rounded-md cursor-pointer shadow-sm my-2"
                      onClick={() =>
                        router(`/group?id=${_id}`)
                      }
                    >
                      <div className="h-12 w-12 ">
                        <img
                          src={`/${image}`}
                          className="w-full h-full rounded-md"
                        />
                      </div>

                      <div className="flex-grow h-full bg-rd-500 flex-col flex justify-between select-none px-2">
                        <span className="h-2/6 w-full flex justify-between px-2 items-center mb-1">
                        <p className="font-interbold text-sm whitespace-nowrap">
                        {name}
                          </p>
                         
                          <p className="font-intermedium text-[12px]">
                            {timeAgo(date)}
                          </p>
                        </span>
                       
                        <span className="h-2/6 w-full flex justify-between px-2 items-center mt-1">
                          <span className="flex">
                            <span className="flex items-center">
                              <MdPerson size={16} className="" />
                              <p className="text-sm font-inter">{members.length}</p>
                            </span>
                            <p>
                             
                            </p>
                          </span>
                          <span id="unread and time" className="flex flex-col justify-between">
                          
                          <span id="dot">

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
    _id: new ObjectId('668b973e31e5475d37569337'),
    description: 'This is a fun group ',
    image: 'lavender.jpeg',
    name: 'Fun group',
    admin: '733581fb-6d4e-4ab2-bbc3-438bf907db30',
    adminname: 'Tunde Lola',
    members: [ '733581fb-6d4e-4ab2-bbc3-438bf907db30' ],
    block: [],
    date: 2024-07-08T07:37:34.099Z,
    __v: 0
  }
] looooool
*/