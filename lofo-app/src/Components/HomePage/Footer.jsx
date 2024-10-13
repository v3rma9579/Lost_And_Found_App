import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
      return (
            <>
                  <footer className='hidden w-full md:block'>
                        <div className='flex p-10 flex-row gap-20 justify-center mx-auto container '>
                              <div className='flex flex-col flex-1 text-left gap-10 '>
                                    <p className='font-semibold text-[20px] text-[#F74780] text-left'>About</p>
                                    <span className=' text-[15px] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis tempora autem laudantium. Harum doloremque fuga cumque, mollitia deleniti repudiandae inventore similique qui quas quam, dolorem minima. Provident pariatur maiores debitis!</span>
                              </div>

                              <div className=' flex flex-1  flex-col  gap-4'>
                                    <p className='font-semibold text-[20px] text-[#F74780] text-left'>Contact</p>

                                    <div className='mt-6 flex gap-4'>
                                          <span className='text-gray-500'><FaPhoneAlt size={15} /> </span>
                                          <span className='text-[15px] text-left text-gray-500'>+91 98434738534</span>
                                    </div>

                                    <div className='flex   gap-4'>
                                          <span className='text-gray-500'><MdEmail size={15} /> </span>
                                          <span className='text-[15px] text-left text-gray-500'>support.lofo@gmail.com</span>
                                    </div>
                              </div>

                              


                              <div className='flex flex-col   flex-1 gap-10'>
                                    <p className='font-semibold text-[20px] text-[#F74780] text-left'>Quick Links</p>
                                    <div className='flex flex-col gap-3 text-left text-gray-500 text-[12px]'>
                                          <span className='cursor-pointer hover:text-gray-950'>Home</span>
                                          <span className='cursor-pointer hover:text-gray-950'>About</span>
                                          <span className='cursor-pointer hover:text-gray-950'>Services</span>
                                          <span className='cursor-pointer hover:text-gray-950'>Contact Us</span>
                                    </div>
                              </div>
                        </div>

                        {/* <div className='mb-5'>
                              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
                              <div className='flex justify-around'>
                                    <span className='text-[13px] text-gray-500'>&copy; Cartify 2024, Created by <a href="https://github.com/v3rma9579">Shubham Verma</a></span>
                                    <img src={payment} alt="" />
                              </div>
                        </div> */}
                  </footer>

            </>
      )
}
