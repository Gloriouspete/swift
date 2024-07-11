//Home, Initial render after login
import { useState } from "react";
import Supportbox from "../../components/addchat/page";
import Footer from "../../components/footer/footer";
import SupportChat from "../../components/supportchat/page";
import Chatmodal from "../../components/chatmodal";
export default function Home() {
  const [showSupport, setShowSupport] = useState(false);
  return (
    <>
      <main className="bg-gray-900 w-screen h-screen flex items-center justify-center">
        <div className="w-full sm:w-2/3 lg:w-1/3 h-screen md:h-full bg-white relative md:rounded-md">
          <span className="w-full border-b border-blue-500 h-auto flex py-2 px-2 justify-between">
            <p className="font-interbold text-lg">Chats</p>
            <img src="/logo.jpeg" className="w-8 h-8 rounded-sm" />
          </span>
          <Chatmodal />
          <Supportbox click={() => setShowSupport(prev => !prev)} />
        </div>
      </main>
      <Footer selected="chat" />
      {showSupport && <SupportChat close={() => setShowSupport(prev => !prev)} />}
    </>
  );
}
