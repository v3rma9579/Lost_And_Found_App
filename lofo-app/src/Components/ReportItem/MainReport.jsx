import React from 'react'
import { Sidebar } from '../Dashboard/Sidebar'
import { Navbar } from '../Dashboard/Navbar'
import { Report } from './Report'

export const MainReport = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Report />
    </div>
  )
}
