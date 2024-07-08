"use client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/loader/loader";
import Test from "./test";
import Log from "./log";

export default function Login() {
  const router = useNavigate()
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [load,setLoad] = useState(false)
  const [showForgot,setForgot] = useState(false)
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    const test = Test(username, password);
    if (!test) {
      return alert("One or more Required Input is Empty or too short");
    }
    setLoad(true);
    try {
      const result = await Log(username, password);
      if (result.success === false) {
        alert(result.message);
        return;
      }
      alert(result.message);
      localStorage.setItem("token", result.token);
      localStorage.setItem("userid", result.userid);
      router('/home')
    } catch (error) {
      if(error && error.message){
        alert(error.message)
      }
      else{
        alert("Error signing you up");
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <main className="w-screen min-h-screen h-screen dark:bg-gray-900 flex items-center justify-center bg-gray-900 p-3">
        <div className="pt-10 flex flex-col w-full md:w-2/3 lg:w-1/3 md:border-2 p-3 md:rounded-md bg-white h-4/5 md:h-auto items-center justify-center rounded-md">
          <div className="mt-6 flex flex-col items-center">
          <img
            src="/logo.jpeg"
            alt="My Image"
            width={50}
            height={50}
          />
            <p className="text-mycolor font-bold text-[24px] text-center">
              Swift
            </p>
            <p className="text-[14px] font-inter text-center">
              Your chat application!
            </p>
          </div>
          <div className="border w-full h-auto px-2 py-1 my-3 border-bk rounded-lg">
            <p className="text-sm font-intermedium">Username</p>
            <input
              type="username"
              placeholder=""
              className="outline-none text-sm font-inter  bg-white"
              value={username.trim()}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          <div className="border w-full h-auto px-2 py-1 my-3 bordblack rounded-lg">
            <p className="text-sm font-intermedium">Password</p>
            <input
              placeholder="   * * * *"
              type="password"
              className="outline-none text-sm font-inter w-full  bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-around w-full h-auto px-3">
          <p onClick={() => router("/register")} className="text-sm font-intermedium cursor-pointer ">Register?</p>
            <p onClick={() => setForgot(true)} className="text-sm font-intermedium cursor-pointer ">Forgot password?</p>
            </div>
          <div className="w-full flex items-center mt-14 px-4">
            <button
              onClick={() => handleSubmit()}
              className="text-md font-intermedium text-white bg-mycolor w-full h-[49px] rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </main>
      {load && <Loader />}
    
    </>
  );
}
