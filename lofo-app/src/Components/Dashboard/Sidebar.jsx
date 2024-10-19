import React, { useState, useEffect } from 'react';
import profile from '../../assets/profile.png';
import { MdDashboard } from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { BiSolidFilePlus } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { auth, db } from '../HomePage/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      } else {
        console.log("User not signed in");
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    fetchUserData();
    window.history.replaceState(null, null, window.location.href);
    window.onpopstate = function () {
      window.location.href = "/login";
    };
  }, []);

  async function handleLogout() {
    localStorage.removeItem('loggedInUserID');
    await auth.signOut();
    window.location.href = "/login";
  }


  return (
    <>
      <div className='hidden md:block'>
        <section className="fixed top-0 left-0 w-72 h-full bg-gray-800 z-20 font-lato transition-all flex flex-col justify-between">
          <div>
            <div className='mt-5 flex flex-col gap-5 items-center justify-center'>
              <img src={profile} className='w-[100px]' alt="Profile" />
              <span className='font-poppins text-white'>
                Welcome, {userDetails ? userDetails.firstName : 'Loading...'}
              </span>
            </div>
            <ul className="mt-12">
              <li>
                <a href="/dashboard" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <MdDashboard size={20} />
                  <span className="ml-4 font-poppins">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/lostitems" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <FaFileCircleQuestion size={20} />
                  <Link to='/lostitems'>
                    <span className="ml-4 font-poppins">View Lost Items</span>
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <BiSolidFilePlus size={20} />
                  <Link to='/reportitems'>
                    <span className="ml-4 font-poppins">Report Missing Items</span>
                  </Link>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <FaMessage />
                  <span className="ml-4 font-poppins">Messaging</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='hover:text-red-500 cursor-pointer flex items-center gap-3 py-4 px-6 text-white'>
            <IoLogOut size={20} />
            <button onClick={handleLogout}>
              <span className="font-poppins">Logout</span>
            </button>
          </div>
        </section>
      </div>


      <div className='md:hidden'>
        <section className='fixed h-full w-20 top-0 left-0 bg-gray-800 z-20 font-lato transition-all justify-between'>
          <div className='ml-4 mt-5'>
            <img className='w-10' src={profile} alt="" />
          </div>


          <ul className="mt-20 flex flex-col gap-4">
            <li>
              <Link to="/dashboard" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                <MdDashboard size={20} />
              </Link>
            </li>
            <li>
              <Link to="/lostitems" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                <FaFileCircleQuestion size={20} />
              </Link>
            </li>
            <li>
              <Link to="/reportitems" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                <BiSolidFilePlus size={20} />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                <FaMessage />
              </Link>
            </li>
          </ul>
          <div className='hover:text-red-500 cursor-pointer mt-[280px] py-4 px-6 text-white'>
            <IoLogOut size={20} />
            <button onClick={handleLogout}>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
