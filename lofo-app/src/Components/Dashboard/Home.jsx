import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar  } from '../Dashboard/Navbar'
import { Dashboard } from '../Dashboard/Dashboard'

export const Home = () => {
  return (
    <div>
      <Sidebar/>
      <Navbar/>
      <Dashboard/>
    </div>
  )
}
