import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { Squash as Hamburger } from 'hamburger-react';

export const Navbar = () => {

      const [showmenu, setShowMenu] = useState(false);
      const [isOpen, setOpen] = useState(false);


      function toggleMenu() {
            setOpen(!isOpen);
            setShowMenu(prev => !prev)
      }
      return (
            <>
                  <div className='hidden fixed md:block w-full'>


                        <nav className='text-white w-full flex justify-between items-center p-5'>
                              <div className='flex items-center gap-2 ml-5 text-black cursor-pointer'>
                                    <img className='w-[100px]' src={logo} alt="" />
                              </div>

                              <div className='flex items-center gap-5'>
                                    <div>
                                          <ul className='flex gap-8 text-black cursor-pointer font-rubik 2xl:text-[25px]'>
                                                <a href="/"><li className='text-[#F74780] '>Home</li></a>
                                                <li className='hover:text-[#F74780]'>About </li>
                                                <li className='hover:text-[#F74780]'>Services</li>
                                                <li className='hover:text-[#F74780]'>Contact</li>
                                          </ul>
                                    </div>


                                    <div className='flex gap-2 font-rubik 2xl:text-[25px]'>
                                          <Link to='/login'>
                                                <button className='border-2 py-2 px-4 rounded-full text-[#F74780] border-[#F74780]  hover:bg-[#F74780] hover:border hover:text-white'>Log In</button>
                                          </Link>

                                          <Link to='/signup'>
                                          <button className='border-2 py-2 px-4 rounded-full bg-[#F74780] hover:bg-white hover:text-[#F74780] hover:border hover:border-[#F74780]'>Sign Up</button>
                                          </Link>

                                         
                                    </div>

                              </div>

                        </nav>
                  </div>

                  <div className='md:hidden'>

                        <nav className='flex items-center justify-between p-5'>
                              <div className='flex items-center gap-2 ml-5 text-black cursor-pointer'>
                                    <img className='w-[100px]' src={logo} alt="" />
                              </div>

                              <div className=''>
                                    <Hamburger toggled={isOpen} toggle={setOpen} color='#F74780' size={25} onToggle={toggleMenu} />


                                    {isOpen ? <div className='fixed'>
                                          <div>
                                                <ul className='cursor-pointer'>
                                                      <li className='text-[#F74780]'>Home</li>
                                                      <li className='hover:text-[#F74780]'>About </li>
                                                      <li className='hover:text-[#F74780]'>Services</li>
                                                      <li className='hover:text-[#F74780]'>Contact</li>
                                                </ul>
                                          </div>
                                    </div> :
                                          <div></div>}

                              </div>
                        </nav>
                  </div>
                  <div className='p-20'>

                  </div>
            </>
      )
}