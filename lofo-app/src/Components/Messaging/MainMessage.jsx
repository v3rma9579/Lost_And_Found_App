import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Side } from './Side'
import { Chat } from './Chat'
import {Input} from './Input'

export const MainMessage = () => {
      return (
            <div className='w-screen font-poppins '>
                  <Sidebar />
                  <Navbar />
                  <div className='ml-[350px] mt-[115px]  w-8/12 h-4/5 flex rounded border border-solid border-gray-200 '>
                        <Side />
                        <Chat />
                  </div>
                 
            </div>
      )
}
