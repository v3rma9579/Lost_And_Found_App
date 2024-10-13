import React from 'react'
import hero from '../../assets/hero-section.png'


export const Hero = () => {
  return (
    <section>
      <div className=''>
        <div className='flex flex-col md:flex-row items-center justify-around p-10 mt-0 pt-0 md:h-[500px] 2xl:h-[700px] gap-10'>
          <div className='flex flex-col flex-1 gap-4 justify-start'>
            <p className='md:text-[70px] text-[40px]  2xl:text-[90px] font-poppins font-bold text-[#F74780] leading-none '>Lost & Found System</p>
            <p className='md:text-[20px] 2xl:text-[30px] font-rubik'>"Reunite with What’s Lost, Simplify What’s Found"</p>
          </div>
          <div className='flex justify-center items-center'>
            <img className='md:w-[500px] md:h-[350px] 2xl:w-[700px] 2xl:h-[500px]' src={hero} alt="" />
          </div>
        </div>
      </div>


      <div className='mb-10'>
      </div>

    </section>
  )
}
