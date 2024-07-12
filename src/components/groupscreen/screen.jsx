import { useEffect, useRef, useState } from "react";
import { FaCamera, FaPaperPlane, FaPaperclip, FaPlane } from "react-icons/fa";
import { timeAgo } from "../worker/page.js";
import { TiWarning } from "react-icons/ti";
import { MdCancel, MdEmojiEmotions } from "react-icons/md";
import { SaveImages } from "./log.js";
import Loader from "../loader/loader.jsx";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import Groupoption from "../forumoption/page.js";
import useLongPress from "./press.js"
import EmojiPicker from "emoji-picker-react";
const userd =  window.localStorage.getItem("userid");

export default function GroupScreen({ submit, receivedData,optiondelete,blockuser }) {
  const fileInput = useRef(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);
  const [imageurl, setImageurl] = useState([]);
  const [openImage, setOpenimage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageprop, setImageProp] = useState([]);
  const [option, setOption] = useState(false);
  const [report, setReport] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [x, setX] = useState(53);
  const [y, setY] = useState(9);
  const [optionprop, setOptionprop] = useState(null);
  const textref = useRef(null);
  const handleUpload = async () => {
    setLoader(true)
    try {
      const response = await SaveImages(images);
      const load = {
        text: "",
        imageurl: response,
        type: "image",
      };
      submit(load);
      setSelected(false)
    } catch (error) {
      alert("Error uploading Image");
    } finally {
      setLoader(false)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text === "" && selected === false) {
        return;
      }
      if (selected) {
        handleUpload();
      }
      if(text !== ''){
        const load = {
          text: text,
          type: "message",
        };
        submit(load);
        setText("");
      }
     
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }, []);
  
  useEffect(() => {
    const handleScrolls = () => {
      const element = textref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
      }
    };
    handleScroll();
    handleScrolls();
  }, [receivedData, submit]);


  const OpenImage = (prop) => {
  const propArray = [prop]
    setImageProp(propArray);
    setOpenimage(true);
  };
  const handleLong = (e, messager) => {
    const rect = e.target.getBoundingClientRect();
    setX(rect.left);
    setY(rect.top);
    setOptionprop(messager);
    setOption(true);
  };

  const longPressProps = useLongPress({
    onLongPress: (event, item) => handleLong(event, item),
    onClick: (event, item) => handleLong(event, item),
  });


  

  return (
    <>
      <section className="w-full bg-white h-full flex flex-col justify-between mt-[50px] relative scrollbar-hide">
        <div className="viewport flex h-4/5 flex-col w-full overflow-auto scrollbar-hide">
          <div className="w-full px-3 py-1 h-auto">
            <span className="flex w-auto h-auto border bg-yellow-100 items-center rounded-full">
              <TiWarning size={27} className="fill-yellow-600 mx-2" />
              <p className="text-[13px] font-inter text-yellow-700">
                Never send money to anyone and never reveal your private
                information
              </p>
            </span>
          </div>
          {receivedData?.map((item, index) => {
            return (
              <div
              key={index}
              className={`msgbox flex items-center w-full h-auto px-2 py-2  cursor-pointer ${
                item.sender === userd ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`min-w-20 w-3/5 lg:w-2/5 h-auto flex justify-end ${
                  item.sender === userd ? "flex-row" : "flex-row-reverse"
                } `}
              >
                <div className="min-w-20 w-4/5 h-auto block">
                  <span
                    className={`flex justify-end min-h-4 h-auto w-full ${
                      item.sender === userd ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <p className="text-sm font-intermedium text-blue-600">
                      {item.sendername}
                    </p>
                    <p className="">&nbsp;~&nbsp;</p>
                  </span>
                  <div
                    
                    onClick={(e) => handleLong(e, item)}
                    className={`${
                      item.sender === userd ? "bg-mycolor rounded-tr-none" : "bg-slate-500 rounded-tl-none"
                    } min-w-20 rounded-[15px] w-auto h-auto min-h-10 px-3 py-3 mb-2`}
                  >
                  
                      <p className="text-white font-intermedium  text-sm whitespace-pre-wrap">
                        {item.message}
                      </p>
                   
                  </div>
                  <span className="flex justify-end min-h-3 h-auto w-full">
                    <p className="text-[11px] text-black">
                      {timeAgo(item.date)}
                    </p>
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full mx-2 mt-4">
                  <img src={"emoticon.png"} className="rounded-full" />
                </span>
              </div>
            </div>
            )
          })}
          <p ref={textref}></p>
        </div>
        <div className="justify-center flex-col flex py-2 w-full bottom-0 absolute">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full border-slate-300 dark:border-slate-700 border-t min-h-14 h-auto items-center justify-around p-2 bg-white"
          >
            <span className="flex items-center rounded-full p-2 flex-grow justify-between ">
              <textarea
                value={text}
                className="w-9/12 h-auto min-h-4 bg-transparent text-sm font-inter outline-none items-center flex flex-col dark:border-none"
                onFocus={() => setEmoji(false)}
                onChange={(e) => setText(e.target.value)}
                aria-multiline
                placeholder="Input message to send"
              />
                <MdEmojiEmotions className="fill-yellow-500" size={18} onClick={() => setEmoji(prev => !prev)}/>
            </span>

            <div className="w-auto h-auto bg-slate-200 p-2 rounded-[40px] mx-2 ">
              <IoPaperPlaneOutline
                size={20}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
          {emoji && (
            <span className="w-full block h-auto">
              <EmojiPicker className="w-full h-40" onEmojiClick={(emojiObject) => setText(value => value + emojiObject.emoji)} />
            </span>
          )}
        </div>
      </section>
     
      {loader && <Loader />}
      {option && (
          <Groupoption
            close={() => setOption(false)}
            xpos={x}
            ypos={y}
            messageid={optionprop === null ? {} : optionprop}
            deletemsg={(ide) => optiondelete(ide)}
            blockuser={(ide) => blockuser(ide)}
          />
        )}
    </>
  );
}
