import { FaPlusCircle, FaSearch } from "react-icons/fa";
export default function Groupbox({click,create}) {
    return(
        <>
        <div className="fixed md:absolute w-12 h-auto rounded-full bg-mycolor animate-bounce bottom-16 right-5 flex items-center justify-center cursor-pointer flex-col">
        <div className=" w-12 h-12 rounded-full bg-mycolor bottom-16 right-5 flex items-center justify-center cursor-pointer " onClick={() => create()}>
            <FaPlusCircle className="fill-white" size={22} />
        </div>
        <div className=" w-12 h-12 rounded-full bg-mycolor bottom-16 right-5 flex items-center justify-center cursor-pointer " onClick={() => click()}>
            <FaSearch className="fill-white" size={22} />
        </div>
           
        </div>
        </>
    )
}