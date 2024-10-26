import React from 'react'
import p1 from '../../assets/Avatar.svg'

export const Message = () => {
  return (
    <div>
      <div>
        <div className='flex gap-2 items-center'>
          <img className='w-10' src= {p1} alt="" />
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  )
}
