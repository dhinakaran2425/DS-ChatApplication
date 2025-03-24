import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      alert("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
    }
  };
  return (
    <div className='h-[10vh]'>
            <div className='px-6 py-4'>
            <form action=""> 
                <div className="flex space-x-3">
            <button className='text-2xl p-2 hover:bg-gray-600 rounded-full duration-300' onClick={handleLogout}><AiOutlineLogout /></button></div>
            </form>
        </div>
        </div>
  )
}

export default Logout
