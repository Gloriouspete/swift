"use client";
import {
  FaCoins,
  FaFileInvoiceDollar,
  FaPen,
  FaRegIdCard,
} from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { IoMdPeople } from "react-icons/io";

import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdDownload,
  MdDelete,
  MdHistory,
  MdLockOutline,
  MdOutlinePrivacyTip,
  MdOutlineSettings,
  MdSettings,
  MdVerified,
  MdPhone,
  MdMail,
  MdMoney,
  MdChatBubble,
  MdBlock,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  IoMdInformationCircleOutline,
  IoMdMail,
  IoMdSwitch,
} from "react-icons/io";
import { CiBookmark, CiBookmarkCheck, CiReceipt, CiShop } from "react-icons/ci";
import { BiMoneyWithdraw, BiSolidEdit, BiSolidExit } from "react-icons/bi";
import { RiChatSmile3Line } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

export default function Setmodal({ email, phone }) {
  const [show, setshow] = useState(false);
  const router = useNavigate();

  return (
    <>
      <main className="w-full flex flex-col items-center min-h-screen h-auto px-1 pb-3 lol:text-gray-100 relative">
        <div className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300 w-full  items-center py-4 cursor-pointer ">
          <div className="flex w-full h-auto py-1 shadow-sm justify-around border rounded-md">
            <span className="flex flex-col items-center">
              <span className="bg-blue-100 rounded-full w-auto h-auto flex items-center justify-center">
              <MdChatBubble size={25} className="fill-blue-600 bg-blue-100 m-2 rounded-full" />
              </span>
              <p className="text-sm font-intermedium">Chat</p>
          
            </span>
            <span className="flex flex-col items-center">
            <span className="bg-red-100 rounded-full w-auto h-auto flex items-center justify-center">
             <MdBlock size={25} className="fill-red-600 bg-red-100 rounded-full m-2" />
             </span>
             <p className="text-sm font-intermedium">Block</p>
            </span>

          </div>
        </div>
      </main>
    </>
  );
}
