"use client";
import { CgProfile } from "react-icons/cg";
import { CiBookmarkCheck, CiChat2, CiCirclePlus, CiHome, CiUser } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi2";
import { HiMiniHome } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { RxHome } from "react-icons/rx";

import {
  MdChat,
  MdChatBubble,
  MdChatBubbleOutline,
  MdHome,
} from "react-icons/md";
import { TiHome, TiHomeOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { IoMenuOutline, IoWallet, IoWalletOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { FaRegUser,FaPlusCircle } from "react-icons/fa";
import { Fa42Group, FaPeopleGroup, FaRegCircleUser } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
export default function Footer({ selected }) {
  const [earnmodal,setEarnmodal] = useState(false)
  const router = useNavigate();
 
  return (
    <>
      <div className="fixed bottom-0 w-full h-auto flex items-center justify-between border-slate-300 sm:bg-none rounded-t-md sm:justify-center">
      <div className="w-full sm:w-2/3 lg:w-1/3 flex h-full justify-between items-center border-t bg-white px-3 py-1">
        <div
          className={`flex flex-col items-center cursor-pointer`}
          onClick={() => router("/home")}
         
        >
          {selected === "chat" ? (
            <>
              <MdChatBubble size={23} className="text-mycolor fill-current" />
              <p className={`font-intermedium text-[10px] text-mycolor`}>
                Chats
              </p>
            </>
          ) : (
            <>
              <MdChatBubbleOutline size={23} className="fill-slate-900 " />
              <p className={`font-intermedium text-[10px] text-slate-500`}>
                Chats
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-center cursor-pointer" onClick={() => router("/groups")} >
          {selected === "group" ? (
            <>
              <FaPeopleGroup size={23} className="fill-mycolor" />
              <p className={`font-intermedium text-[10px] text-mycolor`}>
                Group
              </p>
            </>
          ) : (
            <>
              <FaPeopleGroup size={23} className="" />
              <p className={`font-intermedium text-[10px]`}>
                Groups
              </p>
            </>
          )}
        </div>


        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => router("/profile")}
        >
          {selected === "profile" ? (
            <>
              <FiUser size={23} className="fill-mycolor" />
              <p className="font-intermedium text-[10px] text-mycolor">
                Profile
              </p>
            </>
          ) : (
            <>
              <FiUser size={23} className="" />
              <p className="font-intermedium text-[10px] ">
                Account
              </p>
            </>
          )}
        </div>
        </div>

      </div>
       
    </>
  );
}
