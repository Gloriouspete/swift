'use client'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Log } from "./log";
import Loader from "../../components/loader/loader";
export default function Register() {
  const [logger, setLogger] = useState('Sign Up')
  const [displayname, setdisplayname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [referrer, setReferrer] = useState('')
  const [isLoad,setisLoad] = useState(false)


  const router = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setisLoad(true)
    setLogger('Signing Up . . .')
    if (email === '' || password === '') {
      alert('One or more inputs are empty');
      setisLoad(false)
      setLogger('Register')
      return
    }
    else if (username === '' || displayname === '') {
      alert('One or more inputs are empty');
      setisLoad(false)
      setLogger('Register')
      return
    }
    else {
      try {
        const response = await Log(displayname, username, email, password);

        const { message, success } = response;
        if (success === true) {
          setisLoad(false)
          toast.success(message, {
            position: 'top-right',
            autoClose: 3000,
            closeButton: true,
            bodyClassName: 'bg-mycolor',
            theme: {
              background: '753ff6',
            },
          });
          router('/home');
        } else {
          setisLoad(false)
          setLogger('Register')
          toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            closeButton: true,
            bodyClassName: 'bg-red-600',
            theme: {
              background: 'red',
            },
          });
        }
      } catch (error) {
        setisLoad(false)
        if (error && error.message) {

          setLogger('Register')

          toast.error(error.message, {
            position: 'top-right',
            autoClose: 3000,
            closeButton: true,
            bodyClassName: 'bg-red-600',
            theme: {
              background: 'red',
            },
          });
        }

        else {
          setLogger('Register')
          toast.error('An error occurred while Signing up. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            closeButton: true,
            bodyClassName: 'bg-red-600',
            theme: {
              background: 'red',
            },
          });
        }

      }
    }
  }

  return (
    <main className="bg-gray-900 p-3 w-screen min-h-screen h-auto  flex flex-col items-center justify-center">

      <div className="w-95 h-full sm:w-96 sm:h-auto bg-white mt-10 mb-10 rounded-md border border-slate-300">
        <div className="w-full h-auto flex items-center justify-center mt-5">
          <img
            src="/logo.jpeg"
            alt="My Image"
            width={50}
            height={50}
          />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} noValidate className="bg-white w-full h-auto sm:shadow-sm shadow-black font-inter flex flex-col mt-5 rounded-xl items-center">
          <p className="text-center mt-0 mb-0 text-2xl font-bold text-mycolor">Swift</p>
          <p className="text-center mt-0 mb-6 text-sm font-medium">Register to swift and start chatting</p>
          <label htmlFor='Name' className=' w-full h-auto pl-5 mb-5'>

            <span className="mb-0 text-sm font-medium ml-1 text-slate-700 ">Display Name:</span>

            <input value={displayname} onChange={(value) => setdisplayname(value.target.value)} className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-sm" placeholder="Enter Your Display name" required />
          </label>


          <label htmlFor='username' className=' w-full h-auto pl-5 mb-5'>

            <span className="mb-0 text-sm font-medium ml-1 text-slate-700 ">Username:</span>

            <input value={username.trim()} onChange={(value) => setusername(value.target.value)} className=" text-sm border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto" placeholder="Enter Username" required />
          </label>


          <label htmlFor='email' className=' w-full h-auto pl-5 mb-5'>

            <span className="mb-0 text-sm font-medium ml-1 text-slate-700 ">Email Address:</span>

            <input onChange={(value) => setEmail(value.target.value)} className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-sm" placeholder="Enter email address" required />
          </label>

          <label htmlFor='email' className=' w-full h-auto pl-5 mb-5'>

            <span className="mb-0 text-sm font-medium ml-1 text-slate-700 ">Enter Password:</span>

            <input onChange={(value) => setPassword(value.target.value)} className=" border rounded-md focus:border-indigo-500 w-11/12 px-4  h-12 mx-auto text-sm" placeholder="Enter Password" required />
          </label>

          <label htmlFor="password" className="mb-5 pl-5 w-full h-auto">

            <span className="mt-4 text-sm font-medium ml-1">Enter password again:</span>
            <input value={password} onChange={(value) => setPassword(value.target.value)} className=" text-sm invalid:border-red-500 border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto" placeholder="Enter password Again" />
          </label>
          <button type="submit" className="w-10/12 h-5 hover:bg-indigo-800 mx-auto bg-mycolor px-7 py-5 font-extrabold text-white text-md text-shadow-sm flex flex-col items-center justify-center mt-10 rounded-md">{logger}</button>
          <ToastContainer />
          <p className="mt-4 mb-10 ">Already have an account? <a className="text-indigo-500 font-bold" href="/login"> Login</a></p>
        </form>
      </div>
    {isLoad && <Loader />}
    </main>
  )
}