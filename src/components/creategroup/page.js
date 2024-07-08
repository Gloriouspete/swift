"use client";

import { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Creategroup({ close, sort, value }) {
  const router = useNavigate();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("lavender.jpeg");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  const handleRedirect = (text) => {
    router.push(`/advert?category=${text}`);
  };
  const handleSwipeStart = (event) => {
    // event.preventDefault()
    if (event.touches && event.touches.length > 0) {
      setstartY(event.touches[0].clientY);
    }
  };
  const handleSwipeEnd = (event) => {
    //   event.preventDefault()
    if (event.touches && event.touches.length > 0) {
      const deltaY = event.changedTouches[0].clientY - startY;

      const swipethreshold = 100;

      if (deltaY >= swipethreshold) {
        close();
      } else {
        alert(deltaY);
      }
    }
  };



  const handleSubmit = () => {
    const load = {
     name : name,
      description: description,
      image: sorts,
    };
    sort(load);
    close();
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen h-screen flex flex-col justify-end sm:justify-center items-center"
      >
        <div className="bg-white h-auto w-screen sm:w-4/5 md:w-3/5 flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between sm:rounded-[30px]">
          <div className="w-full h-8 py-1 flex flex-col items-center">
            <span className="w-full h-auto px-2 flex items-center justify-center">
              <span className="w-16 h-[6px] bg-mycolor rounded-full">
              
              </span>
            </span>
          </div>

          <section className="w-full h-auto pb-10">
            <div className="w-full h-auto mb-3">
              <p className="font-interbold text-md">Choose group picture</p>

              <div className="w-full border-slate-300 rounded-md h-auto">
                <span className="w-full flex items-center justify-between px-2 my-3">
                <img src="/lavender.jpeg" className="w-7 h-7 rounded-sm" />
                  <input
                    onChange={(e) => setSort(e.target.value)}
                    value="lavender.jpeg"
                    checked={sorts === "lavender.jpeg"}
                    type="radio"
                    className=" w-4 h-4"
                  />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                  <img src="/electric.jpeg" className="w-7 h-7 rounded-sm" />
                  <input
                    onChange={(e) => setSort(e.target.value)}
                    value="electric.jpeg"
                    checked={sorts === "electric.jpeg"}
                    type="radio"
                    className="w-4 h-4"
                  />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                <img src="/resultchecker.png" className="w-7 h-7 rounded-sm" />
                  <input
                    onChange={(e) => setSort(e.target.value)}
                    value="resultchecker.png"
                    checked={sorts === "resultchecker.png"}
                    type="radio"
                    className="w-4 h-4"
                  />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                <img src="/wallet.jpeg" className="w-7 h-7 rounded-sm" />
                  <input
                    onChange={(e) => setSort(e.target.value)}
                    value="wallet.jpeg"
                    checked={sorts === "wallet.jpeg"}
                    type="radio"
                    className="w-4 h-4"
                  />
                </span>
              </div>
            </div>
            <span className="w-full bg-slate-100 dark:bg-gray-700 h-[2px] my-8 flex"></span>
            <div className="w-full h-auto mb-3">
              <p className="font-interbold text-lg text-slate-900">
                Name & description
              </p>

              <div className="w-full h-auto flex justify-around flex-col">
                <span className="w-full h-auto bg-slate-200 flex rounded-md px-1 flex-col">
                  <p className="text-md font-inter mx-1">Group Name</p>
                  <input
                    className="w-full h-6 outline-none rounded-sm  bg-transparent px-2 text-sm"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </span>

                <span className="w-full h-auto my-2 bg-slate-200 flex rounded-md flex-col px-1 ">
                  <p className="text-md font-inter mx-1">Description</p>
                  <input
                    className="w-full h-6 outline-none rounded-sm bg-transparent px-2 text-sm"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </section>
          <div className="mt-5 w-full h-auto flex items-center justify-around py-2 mb-16">
            <button
              onClick={() => close()}
              className="w-auto px-7 h-8 bg-red-600 text-sm font-interbold rounded-full py-1 text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="w-auto px-10 h-8 bg-mycolor text-white font-interbold text-sm rounded-full py-1"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
