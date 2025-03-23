import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className="avatar relative">
          <div className={`w-10 rounded-full ${isOnline ? "ring ring-success ring-offset-2 ring-offset-base-100" : ""}`}>
            <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
              <span className="text-xl">{user.fullname?.charAt(0)}</span>
            </div>
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span className="text-gray-400 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
