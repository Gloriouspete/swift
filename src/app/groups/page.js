//Groups is the one rendered by the browser when you click it, it shows all the groups youre currently in
import { useState } from "react";
import Footer from "../../components/footer/footer";
import GroupChat from "../../components/groupchat/page";
import Groupmodal from "../../components/groupmodal";
import Groupbox from "../../components/addgroup/page";
import Creategroup from "../../components/creategroup/page";
import { Grouplog } from "./log";
export default function Groups() {
  const [showSupport, setShowSupport] = useState(false);
  const [showCreatemodal,setCreatemodal] = useState(false)
  const handleCreate = async(data) =>{
    const {name,description,image} = data;
   
    if(!name){
      return alert("Group name is empty, You need to set one")
    }
    try{
      const response = await Grouplog(name,description,image)
      if(response){
       alert(response.message)
      }
    }
  catch(error){
    if(error && error.message){
      alert(error.message)
    }
    else{
      alert("Currently unable to create a group")
    }
  }
  finally{
    setCreatemodal(false)
    window.location.reload()
  }
   
  }
  return (
    <>
      <main className="bg-blue-500 w-screen h-screen flex items-center justify-center md:p-3">
        <div className="w-full sm:w-2/3 lg:w-1/3 h-screen md:h-full bg-white relative">
          <span className="w-full border-b border-blue-500 h-auto flex py-2 px-2 justify-between">
            <p className="font-interbold text-lg">Groups</p>
            <img src="/logo.jpeg" className="w-8 h-8 rounded-sm" />
          </span>
          <Groupmodal />
          <Groupbox click={() => setShowSupport(prev => !prev)} create={() => setCreatemodal(prev => !prev)} />
        </div>
      </main>
      <Footer selected="group" />
      {showSupport && <GroupChat close={() => setShowSupport(prev => !prev)} />}
      {showCreatemodal && <Creategroup close={() => setCreatemodal(prev => !prev)} sort={(data) => handleCreate(data)} />}
    </>
  );
}
