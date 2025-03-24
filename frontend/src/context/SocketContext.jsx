import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.user) {
      // Update socket connection configuration
      const newSocket = io("https://ds-chatapplication.onrender.com/", {
        transports: ['polling', 'websocket'],
        secure: false,
        rejectUnauthorized: false,
        query: {
          userId: auth.user._id
        }
      });

      setSocket(newSocket);
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [auth]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
