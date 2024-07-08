import React from "react";
import { motion } from "framer-motion";
export default function Loader() {
  return (
    <div className="fixed w-screen h-screen bg-gray-400 bg-opacity-50 flex flex-col items-center justify-center inset-0 backdrop-blur-md">
           <div className='bg-white rounded-full p-3 border-2 border-mycolor flex flex-row items-center'>
        <img src='/logo.png' className='w-full h-full rounded-full animate-pulse' />
      </div>
    </div>
  );
}

/**
 * 
 * 
 * import React from "react";
import { motion } from "framer-motion";
export default function Loader() {
  return (
    <div className="fixed w-screen h-screen bg-gray-400 bg-opacity-50 flex flex-col items-center justify-center inset-0 backdrop-blur-md">
           <motion.div animate={{
        width: ['50px', '100px', '50px'],
        height: ['50px', '100px', '50px']
      }} transition={{
        duration: 2, ease: 'linear', repeat: Infinity
      }} className='bg-white rounded-full p-3 border-2 border-mycolor flex flex-row items-center'>
        <img src='/logo.png' className='w-full h-full rounded-full ' />
      </motion.div>
    </div>
  );
}

 */