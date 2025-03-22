import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import { Lumiflex } from "uvcanvas";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800/50 hover:bg-slate-700/50 duration-300 rounded-md backdrop-blur-sm">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 z-10"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] relative z-10">
        <div className="avatar relative">
          <div className={`w-10 rounded-full ${isOnline ? "ring ring-success ring-offset-2 ring-offset-base-100" : ""}`}>
            <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
              <span className="text-xl">{selectedConversation.fullname?.charAt(0)}</span>
            </div>
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{selectedConversation.fullname}</h1>
          <span className={`text-sm ${isOnline ? "text-green-400" : "text-gray-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
