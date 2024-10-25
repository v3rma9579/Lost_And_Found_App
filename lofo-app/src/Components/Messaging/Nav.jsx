import { React, useState } from 'react'
import user from '../../assets/avatar.svg'
import { auth, db } from '../HomePage/firebase'
import { doc, getDoc } from 'firebase/firestore';

export const Nav = () => {
      const [userDetails, setUserDetails] = useState(null);

      const fetchUserData = async () => {
            auth.onAuthStateChanged(async (user) => {
                  if (user) {
                        const docRef = doc(db, "Users", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                              setUserDetails(docSnap.data());
                        }
                  }
            });
      };

      fetchUserData();
      return (
            <div>
                  <div className='flex items-center gap-5 bg-gray-800 h-16 text-white'>
                        <img className='w-12 ml-10 cursor-pointer' src={user} alt="" />
                        <span>{userDetails ? userDetails.firstName + " " + userDetails.lastName : ''}</span>
                  </div>
            </div>
      )
}
