import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './Navbar';
import profile from '../../assets/profile.png';
import login from '../../assets/login-logo.png';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusInput, setFocusInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFocus = (input) => {
    setFocusInput(input);
  };

  const handleBlur = (input) => {
    if (input === 'username' && !username) {
      setFocusInput('');
    } else if (input === 'password' && !password) {
      setFocusInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await signInWithEmailAndPassword(auth, username, password);
      const user = auth.currentUser;
      localStorage.setItem('loggedInUserID', user.uid);
      console.log("User logged in successfully");

      toast.success("User Logged in Successfully!", {
        position: 'top-center',
        autoClose: 1000, 
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error("Incorrect username or password", {
        position: 'top-center',
      });
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div>
      <div className="bg-gray-100 h-screen">
        <Navbar />
        <div className="flex items-center justify-center mt-32">
          <div className="flex bg-white rounded-lg shadow-lg max-w-3xl overflow-hidden">
            <div className="hidden md:block w-1/2">
              <img className="h-full w-[400px] object-scale-down" src={login} alt="background" />
            </div>
            <div className="flex flex-col justify-center p-8 w-full">
              <img className="h-24 mx-auto mb-4" src={profile} alt="avatar" />
              <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back !!</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                <div
                  className={`relative mb-6 ${focusInput === 'username' ? 'border-b-2 border-[#F74780]' : 'border-b-2 border-gray-300'}`}
                >
                  <div className="absolute left-0 top-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className={`text-gray-500 transition-all duration-300 ${focusInput === 'username' ? 'text-[#F74780]' : ''}`}
                    />
                  </div>
                  <input
                    type="text"
                    className="pl-8 py-2 w-full focus:outline-none"
                    placeholder="Username"
                    value={username}
                    onFocus={() => handleFocus('username')}
                    onBlur={() => handleBlur('username')}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div
                  className={`relative mb-4 ${focusInput === 'password' ? 'border-b-2 border-[#F74780]' : 'border-b-2 border-gray-300'}`}
                >
                  <div className="absolute left-0 top-2">
                    <FontAwesomeIcon
                      icon={faLock}
                      className={`text-gray-500 transition-all duration-300 ${focusInput === 'password' ? 'text-[#F74780]' : ''}`}
                    />
                  </div>
                  <input
                    type="password"
                    className="pl-8 py-2 w-full focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <a href="#" className="text-sm text-gray-600 hover:text-[#F74780]">
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#F74780] text-white py-2 rounded-lg transition duration-300 hover:bg-pink-700 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
