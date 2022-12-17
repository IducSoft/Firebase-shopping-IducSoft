import React,{ useContext } from 'react';
import { Link} from "react-router-dom";
import {AppContext} from "../App.js"
import { AiOutlineHome } from "react-icons/ai";
import { AiFillAccountBook } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";

const Footer = () => {

    const [state] = useContext(AppContext);
  return (
    <div className='bg-pink fixed bottom-0 w-full py-3 px-5 bg-purple-900 text-white'>
        <div className='flex justify-center mb-4'>
            <Link to="/" className='mx-3 text-black bg-white text-4xl p-2 rounded-full cursor-pointer'>  <AiOutlineHome/></Link>
            {/* <span className='mx-3 text-black bg-white text-4xl p-2 rounded-full cursor-pointer'> <AiOutlineHome/></span> */}
            {
                state.isLogin === true && (<Link to="dashboard" className='mx-3 text-black bg-white text-4xl p-2 rounded-full cursor-pointer'> <AiOutlineBars/></Link>)
            }
            <span className='mx-3 text-black bg-white text-4xl p-2 rounded-full cursor-pointer'><AiFillAccountBook/> </span>
            
            
        </div>
        <span>This project is made by <a href='https://github.com/IducSoft' className='text-black' target="_blank" rel="noreferrer">Isaac Urdaneta</a></span>
    </div>
  )
}

export default Footer;