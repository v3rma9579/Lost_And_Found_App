import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Found } from './Found'

export const MainFound = () => {
      return (
            <>
                  <Sidebar />
                  <Navbar />
                  <div>
                        <Found />
                  </div>
            </>
      )
}
