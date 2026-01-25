import React, { Children, createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = ({ children }) => {

    const socket = useMemo(() => 
        io(import.meta.env.VITE_API)
    , []);

   return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
   );
}