import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { OwnerData } from './OwnerData'

export const OwmerMain = () => {
      return (
            <>
                  <Sidebar />
                  <Navbar />
                  <div>
                        <OwnerData />
                  </div>
            </>
      )
}
