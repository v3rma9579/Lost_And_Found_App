import React from 'react'
import { Navbar } from '../Dashboard/Navbar'
import { Sidebar } from '../Dashboard/Sidebar'
import { Chat } from './Chat'

export const MainWindow = () => {
      return (
            <div>
                  <Sidebar />
                  <Navbar />
                  <Chat />
            </div>
      )
}
