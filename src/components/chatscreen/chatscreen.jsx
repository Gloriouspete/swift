import { useEffect, useRef, useState } from "react";
import { timeAgo } from "../worker/page";
import { MdCancel, MdEmojiEmotions } from "react-icons/md";
import Imagebox from "../imagebox/page.js";
import Loader from "../loader/loader";
import Chatoption from "../chatoption/page.js";
import { IoCheckmarkDone, IoPaperPlaneOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { MsgDisplay, Warning } from "./prop.js";
import useLongPress from "./press.js";
const userd =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;
export default function ChatScreen({ submit, receivedData, optiondelete }) {
  const [text, setText] = useState("");
  const fileInput = useRef(null);
  const textref = useRef(null);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);
  const [imageurl, setImageurl] = useState([]);
  const [openImage, setOpenimage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageprop, setImageProp] = useState([]);
  const [option, setOption] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [x, setX] = useState(53);
  const [y, setY] = useState(9);
  const [optionprop, setOptionprop] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text === "" && selected === false) {
        return;
      }
      
      if (text !== "") {
        const load = {
          text: text,
          type: "message",
          imageurl: "",
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
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [receivedData]);

  useEffect(() => {
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
      }
    };
    handleScroll();
  }, [receivedData, submit]);


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
      <section className="w-full bg-white h-full flex flex-col justify-between mt-[55px] relative scrollbar-hide">
        <div className="flex flex-col w-full overflow-auto pb-20 scrollbar-hide">
          <div className="w-full px-3 py-1 h-auto ">
            <Warning />
          </div>
          {receivedData?.map((item, index) => (
            <div
              key={index}
              className={`msgbox flex items-center whitespace-normal w-full h-auto px-2 py-2 ${
                item.sender === userd ? "justify-end" : "justify-start"
              }`}
            >
              <div className="min-w-20 w-3/5 md:w-2/5 h-auto block">
                <div
                 onClick={(e) => handleLong(e,item)}
                  className={`${
                    item.sender === userd
                      ? "bg-mycolor rounded-tr-none"
                      : "bg-slate-500 rounded-tl-none"
                  } min-w-20 rounded-[10px] w-auto h-auto min-h-10 px-3 py-3 my-2`}
                >
                  <MsgDisplay item={item} />
                </div>
                <span className="flex justify-end min-h-4 h-auto w-full items-center">
                  <p className="text-[12px] text-black dark:text-gray-100">
                    {timeAgo(item.date)}
                  </p>
                  <IoCheckmarkDone
                    size={12}
                    className={`${item.sender !== userd ? "hidden" : ""} ${
                      item.status === "sent" ? "" : " text-green-600 "
                    } mx-3 fill-current`}
                  />
                </span>
              </div>
            </div>
          ))}
          <p ref={textref}></p>
        </div>

        <div className=" justify-center flex-col flex py-2 w-full bottom-0 absolute  bg-white">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full border-slate-300 border-t min-h-14 h-auto items-center justify-around px-2 bg-white  dark:border-gray-500"
          >
            <span className="flex items-center bg-sl py-1  px-1 flex-grow justify-between borer-[0.5px]   dark:border-gray-500">
              <textarea
                value={text}
                className="w-9/12 h-auto min-h-6 bg-transparent text-sm font-inter outline-none items-center justify-center ml-2 flex flex-col "
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message"
              />
              <MdEmojiEmotions className="" size={18} onClick={() => setEmoji(prev => !prev)}/>
            </span>

            <div className="w-auto h-auto border p-2 rounded-[40px] mx-2 bg-slate-200">
              <IoPaperPlaneOutline
                size={18}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
          {emoji && (
            <span className="w-full block h-auto">
              <EmojiPicker className="w-full h-40" onEmojiClick={(e) => setText(value => value.target.value + e.toString())} />
            </span>
          )}
        </div>
        {option && (
          <Chatoption
            close={() => setOption(false)}
            xpos={x}
            ypos={y}
            messageid={optionprop === null ? {} : optionprop}
            deletemsg={(ide) => optiondelete(ide)}
          />
        )}
      </section>
      {openImage && (
        <Imagebox image={imageprop} cancel={(e) => setOpenimage(!e)} />
      )}
      {loader && <Loader />}
      {option && (
        <Chatoption
          close={() => setOption(false)}
          xpos={x}
          ypos={y}
          messageid={optionprop === null ? {} : optionprop}
          deletemsg={(ide) => optiondelete(ide)}
        />
      )}
    </>
  );
}

/**
 * 
  onMouseDown={(e) => longPressProps.onMouseDown(e, item)}
                  onTouchStart={(e) => longPressProps.onTouchStart(e, item)}
                  onMouseUp={(e) => longPressProps.onMouseUp(e, item)}
                  onMouseLeave={(e) => longPressProps.onMouseLeave(e, item)}
                  onTouchEnd={(e) => longPressProps.onTouchEnd(e, item)}
                  //onClick={(e) => handleLong(e, item)}
                  onDoubleClick={(e) => handleLong(e, item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleLong(e, item);
                  }}
 */