import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/avatar.svg';
import signuplogo from '../../assets/signup-logo.png';
import { Navbar } from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../HomePage/firebase';
import { setDoc, doc } from 'firebase/firestore';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusInput, setFocusInput] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleFocus = (input) => {
    setFocusInput(input);
  };

  const handleBlur = (input) => {
    if (input === 'firstName' && !firstName) {
      setFocusInput('');
    } else if (input === 'lastName' && !lastName) {
      setFocusInput('');
    } else if (input === 'email' && !email) {
      setFocusInput('');
    } else if (input === 'phone' && !phone) {
      setFocusInput('');
    } else if (input === 'address' && !address) {
      setFocusInput('');
    } else if (input === 'password' && !password) {
      setFocusInput('');
    } else if (input === 'confirmPassword' && !confirmPassword) {
      setFocusInput('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', { position: 'top-center' });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      // Store user details in Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
          password: password,
        });
        console.log("User registered successfully!");
        toast.success("User Registered Successfully!", { position: 'top-center' });
        setIsRegistered(true);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Registration failed! Please try again.", { position: 'top-center' });
    }
  };

  return (
    <div>
      <div className='bg-gray-100 h-screen'>
        <Navbar />
        <div className="flex items-center justify-center mt-10">
          <div className="flex bg-white rounded-lg shadow-lg max-w-5xl h-[700px] overflow-hidden">
            <div className="hidden md:block w-1/2">
              <div className='flex justify-center items-center'>
                <img className="mt-24 object-scale-down h-[400px] w-[1000px]" src={signuplogo} alt="signup logo" />
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 w-full md:w-1/2">
              <img className="h-20 mx-auto mb-6" src={profile} alt="avatar" />
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

              {/* Conditionally render the form */}
              {!isRegistered ? (
                <form onSubmit={handleRegister}>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="First Name"
                      value={firstName}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={() => handleBlur('firstName')}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Last Name"
                      value={lastName}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={() => handleBlur('lastName')}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Email"
                      value={email}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Phone"
                      value={phone}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Address"
                      value={address}
                      onFocus={() => handleFocus('address')}
                      onBlur={() => handleBlur('address')}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Password"
                      value={password}
                      onFocus={() => handleFocus('password')}
                      onBlur={() => handleBlur('password')}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-0 top-2">
                      <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      className="pl-8 py-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onFocus={() => handleFocus('confirmPassword')}
                      onBlur={() => handleBlur('confirmPassword')}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-pink-600 text-white py-2 rounded-lg transition duration-300 hover:bg-pink-700"
                  >
                    Sign Up
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-600">Registration Successful!</h2>
                  <p>You have successfully signed up.</p>
                </div>
              )}

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
