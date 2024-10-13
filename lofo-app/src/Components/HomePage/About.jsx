import React from 'react'
import about from '../../assets/about.jpg'

export const About = () => {
  return (
    <>
      <div className='flex items-center justify-around'>

        <div className='flex items-start justify-center'>
          <img className='w-[500px] 2xl:w-[600px]' src={about} alt="" />
        </div>

        <div className='w-[400px]'>
          <p className='text-[#F74780] text-2xl font-semibold'>About Us</p>
          <p className='text-[30px] '>Get Started Easily With a Personalized Product Tour</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quam quasi repellendus nemo quis numquam praesentium aspernatur doloribus corporis. Dolores et dolorem doloribus odio, dolore voluptates! Asperiores ducimus vel perspiciatis.</p>
          <button className='p-2 bg-[#F74780] mt-5 w-[150px] h-[50px] rounded-full text-white font-semibold hover:bg-white hover:border hover:border-[#F74780] hover:text-[#F74780]'>About More</button>
        </div>
      </div>
    </>
  )
}
