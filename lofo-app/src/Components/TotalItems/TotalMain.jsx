import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Total } from './Total'

export const TotalMain = () => {
      return (
            <>
                  <div>
                        <Sidebar />
                        <Navbar />
                  </div>
                  <div>
                        < Total />
                  </div>
            </>
      )
}
