import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { Lumiflex } from "uvcanvas";
import { toast } from 'react-toastify';

function SignUp() {
  const [showHint, setShowHint] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleFocus = (field) => {
    setShowHint({
      fullname: false,
      email: false,
      password: false,
      confirmPassword: false,
      [field]: true
    });
  };

  const handleBlur = () => {
    setShowHint({
      fullname: false,
      email: false,
      password: false,
      confirmPassword: false
    });
  };

  const[authUser,setAuthUser]=useAuth()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  const password = watch("password","");
  const confirmPassword = watch("confirmpassword","");
  const validatePasswordMatch = (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };
  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  // Add ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleBlur();
      }
    };

    // Add click outside handler
    const handleClickOutside = (event) => {
      const panel = document.querySelector('.validation-panel');
      const inputs = document.querySelectorAll('input');
      const clickedInput = Array.from(inputs).some(input => input.contains(event.target));
      
      if (panel && !panel.contains(event.target) && !clickedInput) {
        handleBlur();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='absolute inset-0 z-0'>
      <Lumiflex />
      </div>
      <div className='relative'>
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-800 p-8 rounded-lg bg-gray-800 w-96">
          <h1 className='text-2xl text-center p-2'><span className='text-indigo-400 font-semibold'>DS</span> Chat<span className='text-indigo-400 font-semibold'>App</span></h1>
          <h1 className='text-2xl p-2 font-semibold'>Sign Up</h1>
          <div className="relative">
            <div className="flex-grow mb-4">
              <label className="input validator relative">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                <input 
                  type="input" 
                  className="w-full p-2 rounded-md"
                  required 
                  placeholder="fullname" 
                  pattern="[A-Za-z][A-Za-z0-9\-]*" 
                  minLength="3" 
                  maxLength="30"
                  onFocus={() => handleFocus('fullname')}
                  onBlur={handleBlur}
                  {...register("fullname", { required: true })} 
                  />
              </label>
            </div>

            <div className="flex-grow mb-4">
              <label className="input validator relative">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input 
                  type="email" 
                  className="w-full p-2 rounded-md"
                  placeholder="E-mail" 
                  required
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  {...register("email", { required: true })} 
                />
              </label>
            </div>

            <div className="relative flex items-center gap-2">
              <div className="flex-grow mb-4">
                <label className="input validator relative">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                  <input 
                    type="password" 
                    className="w-full p-2 rounded-md"
                    required 
                    placeholder="Password" 
                    minLength="8" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message: "Password must contain at least one number, one uppercase and lowercase letter"
                      }
                    })} 
                    autoComplete='password'
                  />
                </label>
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <div className="flex-grow">
                <label className="input validator relative">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                  <input 
                    type="password" 
                    className="w-full p-2 rounded-md"
                    required 
                    placeholder="Confirm Password" 
                    minLength="8" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    {...register("confirmPassword", {
                      required: true,
                      validate: validatePasswordMatch,
                    })}
                    autoComplete='password' 
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-300">Have an Account? <Link to="/login"className='text-indigo-400 underline cursor-pointer ml-1'>Login</Link></p>
            <input type="submit" value="SignUp" className="btn btn-active bg-indigo-500 hover:bg-indigo-400"/>
          </div>
        </form>

        {/* Floating Validation Panel */}
        <div className={`
          validation-panel
          lg:absolute lg:left-full lg:top-0 lg:ml-4 lg:w-80 
          fixed left-1/2 top-[20%] -translate-x-1/2 
          w-[90%] max-w-sm z-50 transition-all duration-300 ease-in-out
          ${!(showHint.fullname || showHint.email || showHint.password || showHint.confirmPassword) ? 'hidden' : ''}
          lg:block
        `}>
          {(showHint.fullname || showHint.email || showHint.password || showHint.confirmPassword) && (
            <>
              {/* Overlay for mobile */}
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden" 
                   onClick={handleBlur}
              />
              
              {/* Validation Content */}
              <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700 relative">
                {/* Close button for both mobile and desktop */}
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={handleBlur}
                  aria-label="Close validation panel"
                >
                  ✕
                </button>

                {/* Show only the active hint */}
                {showHint.fullname && (
                  <div className="text-gray-200 text-sm transition-opacity duration-200">
                    <h3 className="text-indigo-400 font-medium mb-2">Fullname Guidelines</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        3 to 30 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Letters, numbers or dash only
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Must start with a letter
                      </li>
                    </ul>
                  </div>
                )}
                {showHint.email && (
                  <div className="text-gray-200 text-sm transition-opacity duration-200">
                    <h3 className="text-indigo-400 font-medium mb-2">Email Format</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Valid email address required
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Example: name@domain.com
                      </li>
                    </ul>
                  </div>
                )}
                {showHint.password && (
                  <div className="text-gray-200 text-sm transition-opacity duration-200">
                    <h3 className="text-indigo-400 font-medium mb-2">Password Requirements</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Minimum 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        At least one number
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        One lowercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        One uppercase letter
                      </li>
                    </ul>
                  </div>
                )}
                {showHint.confirmPassword && (
                  <div className="text-gray-200 text-sm transition-opacity duration-200">
                    <h3 className="text-indigo-400 font-medium mb-2">Confirm Password</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span>
                        Must match password exactly
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
