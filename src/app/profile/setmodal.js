"use client";
import {
  FaCoins,
  FaFileInvoiceDollar,
  FaPen,
  FaRegIdCard,
  FaUser,
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
  MdVerifiedUser,
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

export default function Setmodal({email,phone}) {

  const [show,setshow] = useState(false)
  const router = useNavigate();

  return (
    <>
      <main className="w-full flex flex-col items-center min-h-screen h-auto px-1 pb-3 lol:text-gray-100 relative">
        <div
          className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300 w-full  items-center py-4 cursor-pointer "
         
        >
          <div className="flex-grow flex px-2 ">
            <MdMail size={20} className="mr-4" />
            <p className="text-sm font-intermedium text-black lol:text-gray-100">
              {email}
            </p>
          </div>
          <MdArrowForwardIos size={15} className="mr-3 fill-white" />
        </div>

        <div
          className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full  items-center py-4 cursor-pointer "
          
        >
          <span className="flex-grow flex px-2 ">
            <FaUser size={20} className="mr-4" />
            <p className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
              Edit Displayname
            </p>
          </span>
          <MdArrowForwardIos
            size={15}
            className="mr-3 fill-slate-700 lol:fill-gray-200"
          />
        </div>

 
        <div
          onClick={() => router.push("/password")}
          className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
        >
          <span className="flex-grow flex px-2 ">
            <MdLockOutline size={20} className="mr-4" />
            <p className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
              Update password
            </p>
          </span>
          <MdArrowForwardIos
            size={15}
            className="mr-3 fill-slate-700 lol:fill-gray-200"
          />
        </div>

   

        <a className="flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4" href="mailto:">
          <span className="flex-grow flex px-2 ">
            <RiChatSmile3Line size={20} className="mr-4" />
            <p className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
              Contact Support
            </p>
          </span>
          <IoMdMail size={18} className="mr-3 fill-blue-500" />
        </a>

       
    
        <div
          onClick={() => {
            localStorage.removeItem("token");
            alert("logged out");
            window.location.href = "/login";
            router.refresh();
          }}
          className="md:flex justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 hidden cursor-pointer "
        >
          <span className="flex-grow flex px-2 ">
            <BiSolidExit size={20} className="mr-4 fill-red-600" />
            <p className="text-sm font-intermedium text-red-700">Log out</p>
          </span>
          <MdArrowForwardIos
            size={15}
            className="mr-3 fill-slate-700 lol:fill-gray-200"
          />
        </div>
        
      </main>
    </>
  );
}
