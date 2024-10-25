import React from 'react'
import user from '../../assets/avatar.svg'
import p1 from '../../assets/Aakash.jpeg'
import p2 from '../../assets/shubham.jpg'
import p3 from '../../assets/kishan.jpeg'

export const Chats = () => {
  return (
    <div>
      <div className='flex items-center gap-4 p-5 text-white cursor-pointer hover:bg-gray-800'>
            <img className='w-12' src= {user} alt="" />
            <div>
                  <span className='text-[15px]'>Shubham Verma</span>
                  <p className='text-[12px] font-extralight text-gray-200 font-rubik'>Thank you</p>
            </div>
      </div>

      <div className='flex items-center gap-4 p-5 text-white cursor-pointer hover:bg-gray-800'>
            <img className='w-12 h-12 object-cover rounded-full' src= {p1} alt="" />
            <div>
                  <span className='text-[15px]'>Aakash Choudhary</span>
                  <p className='text-[12px] font-extralight text-gray-200 font-rubik'>Bhai mera saman dede</p>
            </div>
      </div>

      <div className='flex items-center gap-4 p-5 text-white cursor-pointer hover:bg-gray-800'>
            <img className='w-12 h-12 object-cover rounded-full' src= {p2} alt="" />
            <div>
                  <span className='text-[15px]'>Shubham Verma</span>
                  <p className='text-[12px] font-extralight text-gray-200 font-rubik'>Thank you</p>
            </div>
      </div>

      <div className='flex items-center gap-4 p-5 text-white cursor-pointer hover:bg-gray-800'>
            <img className='w-12 h-12 object-cover rounded-full' src= {p3} alt="" />
            <div>
                  <span className='text-[15px]'>Kailash Kher</span>
                  <p className='text-[12px] font-extralight text-gray-200 font-rubik'>Saiyaaaaaaan</p>
            </div>
      </div>
    </div>
  )
}
