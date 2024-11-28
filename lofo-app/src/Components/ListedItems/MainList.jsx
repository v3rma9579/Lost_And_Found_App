import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { List } from './List'

export const MainList = () => {
      return (
            <>
                  <div>
                        <Sidebar />
                        <Navbar />
                  </div>
                  <div>
                        <List />
                  </div>
            </>
      )
}
