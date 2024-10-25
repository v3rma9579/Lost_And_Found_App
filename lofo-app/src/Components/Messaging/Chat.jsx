import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Messages } from './Messages';
import { Input } from './Input';

export const Chat = () => {
      return (
            <div className='flex-initial w-full bg-gray-200'>
                  <div className='h-16 bg-slate-600 flex items-center justify-between text-white'>
                        <p className='ml-3 font-light text-[13px]'>Shubham</p>
                        <BsThreeDotsVertical size={20} className='text-white mr-5 cursor-pointer' />
                  </div>
                  <Messages />
                  <Input />
            </div>
      )
}
