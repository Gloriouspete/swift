
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import Log from "./log.js";
import { IoMdCopy } from "react-icons/io";
const userd =
  typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;

export default function Chatoption({
  close,
  xpos,
  ypos,
  messageid,
  deletemsg,
}) {
  const modalRef = useRef();

  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  //alert(messageid.sender + "kio"+ userd)
  const deletebutton = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message"
    );
    if (confirmed) {
      const response = await Log(messageid._id);
      if (response) {
        deletemsg(messageid._id);
        alert("deleted");
        close()
      } else {
        alert("Unable to delete message");
      }
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(
      messageid.message
    );
    alert("Copied");
  };
  return (
    <>
      <div
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed inset-0 z-[5000] backdrop-blur-sm bg-yellow-00 bg-opacity-50 w-full h-full "
      >
        <div
          style={{
            position: "absolute",
            top: ypos,
            left: xpos,
            backgroundColor: "#36454f",
          }}
          className="absolute  w-40 rounded-md flex flex-col items-center py-4 "
        >
          {messageid.sender === userd && (
            <button
              className="w-full h-auto flex items-center border-white border-b px-2 justify-between py-1"
              onClick={() => deletebutton()}
            >
              <p className="text-red-500 font-intermedium text-md mx-2">
                Delete
              </p>
              <MdDelete size={18} className="fill-red-500 ml-2" />
            </button>
          )}
          <button
            className="w-full h-auto flex items-center border-white border-b px-2 py-1 justify-between "
            onClick={() => copy()}
          >
            <p className="text-white font-intermedium text-md mx-2">Copy</p>
            <IoMdCopy size={18} className="fill-white ml-2" />
          </button>
        </div>
      </div>
    </>
  );
}
