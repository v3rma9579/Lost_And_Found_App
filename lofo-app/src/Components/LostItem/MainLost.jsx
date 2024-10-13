import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Lost } from './Lost'

export const MainLost = () => {
      return (
            <div>
                  <Sidebar />
                  <Navbar />
                  <Lost />
            </div>

      )
}
