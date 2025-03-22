import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import { Lumiflex } from "uvcanvas"
function Login() {
    const[authUser,setAuthUser]=useAuth()
    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
        const userInfo={
          email:data.email,
          password:data.password,
        }
        axios.post('/api/user/login',userInfo)
        .then((response)=>{
          console.log(response)
          if(response){
            alert('Login Successfully')
          }
          localStorage.setItem('ChatApp',JSON.stringify(response.data))
          setAuthUser(response.data)
        }).catch((error)=>{
          if(error.response){
            alert(error.response.data.message)
          }
        }
        )
      }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='absolute inset-0 z-0'>
      <Lumiflex />
      </div>
      <div className='relative'>
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-800 p-8 rounded-lg bg-gray-800 w-96">
          <h1 className='text-2xl text-center p-2'><span className='text-indigo-400 font-semibold'>DS</span> Chat<span className='text-indigo-400 font-semibold'>App</span></h1>
          <h1 className='text-2xl p-2 font-semibold'>Login</h1>
          <div className="relative">

            <div className="flex-grow mb-4">
              <label className="input validator relative">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input 
                  type="email" 
                  className="w-full p-2 rounded-md"
                  placeholder="E-mail" 
                  autoComplete="email"
                  required
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
                    autoComplete="current-password"
                    {...register("password", { required: true })} 
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-300">New User? <Link to="/signup"className='text-indigo-400 underline cursor-pointer ml-1'>Register</Link></p>
            <input type="submit" value="Login" className="btn btn-active bg-indigo-500 hover:bg-indigo-400"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
