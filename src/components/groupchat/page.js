"use client";
import { useState, useEffect, Suspense } from "react";
import { MdArrowBackIos, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader.jsx";
import { Location, Log, Join } from "./log.js";
import { io } from "socket.io-client";
import SupportScreen from "../supportscreen/screen.jsx";
import { FaUser } from "react-icons/fa";
const userd =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;
const SERVER_URL = "http://localhost:8080";
const socket = io(SERVER_URL);

export default function Supportchat({ close }) {
  const router = useNavigate();

  const [msgArray, setMsgArray] = useState([]);
  const [myimage, setMyimage] = useState("/manphone.jpeg");
  const [searchtext, setSearch] = useState("");
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

  const handleJoin = async (id) => {
    setLoad(true);
    try {
      const response = await Join(id);
      alert(response.message)
    } catch (error) {
      if(error && error.message){
        alert(error.message)
      }
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
        <main className="w-screen h-screen flex md:w-2/3 lg:w-1/3 md:h-4/5 bg-white">
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
                  placeholder="Search for Groups"
                  className="font-intermedium text-sm w-4/5 border p-2 rounded-md"
                  value={searchtext}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </header>
            <section className="w-full h-auto px-2 flex flex-col">
              {msgArray.map((item, index) => {
                return (
                  <div className="w-full h-auto flex border rounded-md p-2 my-2" >
                    <img src={`/${item.image}`} className="w-10 h-10 rounded-md mx-2" alt="Profile pics" onClick={() => router(`/group?id=${item._id}`)} />
                    <span className="w-full h-auto" onClick={() => router(`/group?id=${item._id}`)}>
                      <p className="text-md font-interbold">{item.name}</p>
                      <span className="w-auto flex h-auto items-center">
                      <FaUser size={10} /> 
                      <p className="text-sm font-inter mx-1">{item.members.length}</p>
                        </span>
                     
                    </span>
                    <button className="px-3 w-auto h-auto text-black border rounded-sm" onClick={() => handleJoin(item._id)}>Join</button>
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
