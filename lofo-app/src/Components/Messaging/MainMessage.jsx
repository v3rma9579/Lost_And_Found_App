import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Side } from './Side'
import { Chat } from './Chat'

export const MainMessage = () => {
      return (
            <div className='w-screen h-screen font-poppins'>
                  <Sidebar />
                  <Navbar />
                  <div className='ml-[350px] mt-[100px] w-8/12 h-4/5 flex rounded border border-solid'>
                        <Side />
                        <Chat />
                  </div>
            </div>
      )
}
