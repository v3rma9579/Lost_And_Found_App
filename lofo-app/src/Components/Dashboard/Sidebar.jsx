import React, { useState, useEffect } from 'react';
import profile from '../../assets/profile.png';
import { MdDashboard } from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { BiSolidFilePlus } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { auth, db, storage } from '../HomePage/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaFileAlt } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

export const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.warning("Please select an image before uploading.");
      return;
    }
    if (!auth.currentUser) return;

    setUploading(true);
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);

    try {
      await uploadBytes(storageRef, imageFile);
      const photoURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      await updateDoc(userDocRef, { profilePicture: photoURL });

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profilePicture: photoURL,
      }));

      toast.success("Profile picture updated successfully!");
      setUploading(false);
      setImageFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload profile picture");
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('loggedInUserID');
    await auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className='hidden md:block'>
        <section className="fixed top-0 left-0 w-72 h-full bg-gray-800 z-20 font-lato transition-all flex flex-col justify-between">
          <div>
            <div className='mt-5 flex flex-col gap-5 items-center justify-center'>
              <img
                src={userDetails?.profilePicture || profile}
                className='w-[100px] h-[100px] rounded-full cursor-pointer'
                alt="Profile"
                onClick={() => setIsModalOpen(true)}
              />
              <span className='font-poppins text-white'>
                Welcome, {userDetails ? userDetails.firstName : 'Loading...'}
              </span>
            </div>
            <ul className="mt-12">
              <li>
                <Link to="/dashboard" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <MdDashboard size={20} />
                  <span className="ml-4 font-poppins">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/lost" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <FaFileCircleQuestion size={20} />
                  <span className="ml-4 font-poppins">View Lost Items</span>
                </Link>
              </li>
              <li>
                <Link to="/found" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                <FaFileAlt size={20} />
                  <span className="ml-4 font-poppins">View Found Items</span>

                </Link>
              </li>
              <li>
                <Link to="/reportitems" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <BiSolidFilePlus size={20} />
                  <span className="ml-4 font-poppins">Report Items</span>
                </Link>
              </li>
              <li>
                <Link to="/message" className="flex items-center py-4 px-6 text-white hover:text-blue-500">
                  <FaMessage />
                  <span className="ml-4 font-poppins">Messaging</span>
                </Link>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-gray-800 p-5 rounded-lg text-center text-white w-96">
            <h2 className="text-lg font-semibold mb-4">Change Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-white mb-3"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleUpload}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
