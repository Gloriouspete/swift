import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Preview() {
  const router = useNavigate()
  const redirect = () =>{
    setTimeout(() =>{
     router('/login')
    },1000)
  }
  useEffect(() =>{
   redirect()
  },[])
  return (
    <div className=" w-screen h-screen">
      <main className='w-full md:w-1/3 h-screen justify-center items-center flex'>
        <div className='w-auto h-auto'>
          <img src='/logo.jpeg' className='h-32 w-32 animate-spin' />
        </div>
      </main>
    </div>
  );
}

export default Preview;
