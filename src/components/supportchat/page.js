"use client";
import { useState, useEffect, Suspense } from "react";
import { MdArrowBackIos, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import { Location, Log, Profile } from "./log.js";
import { io } from "socket.io-client";
import SupportScreen from "../supportscreen/screen.jsx";
import { MdCancel } from "react-icons/md";
export default function Supportchat({ close }) {
  const router = useNavigate();

  const [msgArray, setMsgArray] = useState([]);
  const [myimage, setMyimage] = useState("/manphone.jpeg");
  const [searchtext, setSearch] = useState("");
  const [forum, setforum] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [posterid, setPoster] = useState("");
  const [realsender, setSender] = useState("");
  const [load, setLoad] = useState(false);
 
  const FetchData = async (id) => {
    setLoad(true);
    try {
      const response = await Log(id);
      if (Array.isArray(response)) {
        setMsgArray(response);
      } else {
        alert("empty")
      }
    } catch (error) {
      //router.back()
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    FetchData(searchtext);
  }, [searchtext]);
  return (
    <>
      <main className="w-screen h-screen min-h-full flex flex-col items-center fixed top-0 bottom-0 justify-center">
        <main className="w-screen h-screen flex md:w-2/3 lg:w-1/3 md:h-4/5 bg-white md:border md:rounded-md">
          <main className="w-full min-h-full h-auto flex flex-col  md:border-2 relative">
            <header className="w-full h-auto px-2 py-2 flex flex-col items-center justify-between border-b-[0.5px] dark:border-gray-500 bg-gray-900 ">
              <span className="w-full h-auto justify-end flex">
                <MdOutlineClose
                  size={20}
                  className="fill-white"
                  onClick={() => close()}
                />
              </span>
              <span className="my-4 w-full">
                <input
                  placeholder="Search for a user"
                  className="font-intermedium text-sm w-4/5 border p-2 rounded-md"
                  value={searchtext}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </header>
            <section className="w-full h-auto px-2 flex flex-col">
              {msgArray.map((item, index) => {
                return (
                  <div className="w-full h-auto flex border rounded-md p-2 my-2" onClick={() => router(`/viewprofile?user=${item.username}`)}>
                    <img src="/emoticon.png" className="w-10 h-10 rounded-full mx-2" alt="Profile pics" />
                    <span className="w-full h-auto">
                      <p className="text-md font-interbold">{item.displayname}</p>
                      <p className="text-sm font-inter">@{item.username}</p>
                    </span>
                  </div>
                );
              })}
            </section>
          </main>
        </main>
        {load && <Loader />}
      </main>
    </>
  );
}
