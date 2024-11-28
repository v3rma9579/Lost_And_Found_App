import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { ClaimItem } from './ClaimItem'

export const MainClaim = () => {
      return (
            <>
                  <Sidebar />
                  <Navbar />
                  <div>
                        <ClaimItem />
                  </div>
            </>
      )
}
