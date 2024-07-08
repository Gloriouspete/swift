import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaList, FaStop } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import Box from "@/components/box/page";
import { FaRegBell } from "react-icons/fa6";
import { useRouter } from "next/navigation";
const firstname = typeof window !== "undefined" ? window.localStorage.getItem("firstname") : "Jaan";

export default function Header({text}) {
  const router = useRouter();
  const [isClick, setisClick] = useState(false);
  // Define the icon components
  const eruku = () => <GoBell size={25} />;

  const xa = () => <FaArrowRight size={32} color="#ffffff" />;

  // Initialize the state with the eruku function
  const [header, setHeader] = useState(eruku);

  // Toggle the header state between eruku and xa
  const edonckick = () => {
    setisClick((prevclick) => !prevclick);
    setHeader((prevHeader) => (prevHeader === eruku() ? xa() : eruku()));
  };

  // Initialize the isClick state

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 h-14 flex items-center justify-between bg-white">
      <div className="ml-3 ">
        <img
          onClick={() => router.push("/home")}
          src="/comfort.png"
          alt="My Image"
          width={50}
          height={50}
          className="rounded-xl"
        />
      </div>
      {isClick && <Box />}
      <div className="ml-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-interbold text-white mx-2" onClick={() => router.push("/profile")}>
          {firstname?.slice(0,1)[0]}
        </span>
      </div>
    </div>
  );
}
