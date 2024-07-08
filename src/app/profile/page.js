
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdOutlineSettings,
  MdSettings,
  MdVerified,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SaveImages, Fetchp } from "./log.js";
import Setmodal from "./setmodal.js";
import Loader from "../../components/loader/loader.jsx";
export default function Profile() {
 
  const fileInput = useRef(null);
  const router = useNavigate();
  const [imageurl, setImageurl] = useState("/emoticon.png");
  const [load, setLoad] = useState("");
  const [name, setName] = useState(`. . . . .`);
  const [coin, setCoin] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [verified, setVerified] = useState("no");

  const fetchData = async () => {
    setLoad(true)
    try {
      const response = await Fetchp();
      if (response.success) {
        const data = response.data;
        setName(`${data.displayname}`);
        setEmail(data.email);
        setusername(data.username);
       
      }
    } catch (error) {
      if(error && error.message){
        alert(error.message)
      }
      else{
        alert("error fetching user")
      }
      //router("/login");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  
  return (
    <>
      <div className="w-screen flex flex-col h-auto min-h-screen bg-gray-900 items-center ">
        
        <main className="w-screen flex flex-col items-center min-h-screen md:min-h-max h-auto px-1 md:w-3/5 lg:w-2/5  rounded-md md:mt-4 bg-white lol:bg-gray-900 md:border">
          <header
            aria-label="profile header"
            className="w-full h-10 flex justify-between items-center bg-blue-0 px-2 "
          >
            <span className="flex items-center">
              <MdArrowBackIos
                size={17}
                className="fill-black lol:fill-white cursor-pointer"
                onClick={() => router(-1)}
              />
              <p className="text-md font-intermedium cursor-pointer">Profile</p>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                alert("logged out");
                window.location.href = "/login";
                //router.refresh();
              }}
              className="w-auto h-auto bg-red-600 text-white font-intermedium text-sm rounded-full px-3 py-1"
            >
              Log out
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
          <Setmodal email={email} phone={username} />
        </main>
      </div>
      {load && <Loader />}
    </>
  );
}
