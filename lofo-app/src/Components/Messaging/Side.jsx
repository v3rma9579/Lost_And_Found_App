import React from 'react'
import { Nav } from './Nav'
import { Search } from './Search'
import { Chats } from './Chats'

export const Side = () => {
  return (
    <div className='flex-initial w-[350px] border-r-black border-r-[1px] bg-gray-700'>
      <Nav />
      <Search />
      <Chats/>
    </div>
  )
}
