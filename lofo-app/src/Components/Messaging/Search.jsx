import React from 'react'

export const Search = () => {
      return (
            <div className='flex justify-center'>
                  <input className='w-full h-14 bg-transparent text-white border-2 placeholder:text-gray-500 px-4 border-none' type="text" placeholder='Find a User' />
                  <hr className='text-white' />
            </div>
      )
}
