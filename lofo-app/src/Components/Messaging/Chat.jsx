import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Messages } from './Messages';
import { Input } from './Input';

export const Chat = () => {
      return (
            <div className='flex flex-col w-full bg-blue-300 relative h-[600px] 2xl:h-[800px]'>
                  <div className='h-24 bg-slate-600 flex items-center justify-between text-white'>
                        <p className='ml-3 font-light text-[13px]'>Shubham</p>
                        <BsThreeDotsVertical size={20} className='text-white mr-5 cursor-pointer' />
                  </div>
                  <div className='overflow-y-auto scrollbar scrollbar-hidden'>
                        <Messages />
                  </div>
                  <div className='bottom-0 absolute ml-0 w-full'>
                        <Input />
                  </div>
                  
            </div>
      )
}
