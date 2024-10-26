import React from 'react'
import { IoIosAttach } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import '../../../src/index.css';

export const Input = () => {
      return (
            <div className=' input_class h-[50px]  bg-white p-3 2xl:mt-[482px] flex justify-between w-full'>
                  <input type="text" placeholder='Type something...' className='w-full border-none bg-transparent outline-none' />
                  <div className='flex items-center gap-3'>
                        <IoIosAttach className='cursor-pointer' size={20} />
                        <input type="file" style={{ display: "none" }} />
                        <label htmlFor="file">
                              <FaImage className='cursor-pointer' size={20} color='gray' />
                        </label>
                        <button><IoIosSend className='cursor-pointer' size={20} color='blue' /></button>
                  </div>
            </div>
      )
}
