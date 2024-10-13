import React from 'react'
import { FaBell } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 flex items-center justify-between p-4 shadow-md fixed top-0 h-20  w-full z-10">
      <div className='flex items-start'>
      </div>
      <i className=""></i>
      <div className="flex items-center space-x-4 gap-3 cursor-pointer">
      <FaBell size={20} className='text-white hover:text-orange-500' />
      </div>
    </nav>
  )
};
