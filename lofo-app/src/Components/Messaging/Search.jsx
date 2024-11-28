import React, { useState } from 'react';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../HomePage/firebase';
import { AuthContext } from "../../AuthContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import p1 from '../../assets/profile.png';
import { IoChatboxEllipses } from "react-icons/io5";

export const Search = () => {
      const [username, setUsername] = useState("");
      const [user, setUser] = useState(null);

      const {currentUser} = useContext(AuthContext);

      const searchUser = async () => {
            try {
                  const lowercaseUsername = username.toLowerCase().trim();
                  const q = collection(db, "Users");
                  const querySnapshot = await getDocs(q);

                  let foundUser = null;
                  querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        const firstName = userData.firstName.toLowerCase();
                        const fullName = `${userData.firstName} ${userData.lastName}`.toLowerCase();

                        if (firstName === lowercaseUsername || fullName === lowercaseUsername) {
                              foundUser = userData;
                        }
                  });

                  if (foundUser) {
                        setUser(foundUser);
                  } else {
                        toast.error("User not found");
                        setUser(null);
                  }
            } catch (err) {
                  toast.error("An error occurred while searching");
            }
      };

      const handleKey = (e) => {
            if (e.key === "Enter") {
                  searchUser();
            }
      };

      const handleSelect = async () => { 
            const combined = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

            try {
                  await getDocs(db, "chats", combined, {messages: []})
            }
            catch {
                  
            }
      }


      return (
            <div className='flex flex-col items-center'>
                  <input
                        className='w-full h-14 bg-transparent text-white border-2 placeholder:text-gray-500 px-4 border-none'
                        type="text"
                        placeholder='Find a User'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKey}
                  />
                  <hr className='text-white' />

                  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

                  {user && (
                        <div className="text-white h-[50px] flex items-center w-full gap-2 justify-around cursor-pointer hover:bg-gray-900">
                              <div className='flex items-center gap-2'>
                                    <img className='w-10 h-10' src={p1} alt="Profile" />
                                    <span>{user.firstName} {user.lastName}</span>
                              </div>

                              <IoChatboxEllipses size={20} color='#03adfc' className='animate-pulse' />
                        </div>
                  )}
            </div>
      );
};
