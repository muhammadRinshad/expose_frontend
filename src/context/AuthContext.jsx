
// // import { createContext, useContext, useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // import API from "../api/axios";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [liveNotifications, setLiveNotifications] = useState([]);
// //   const [socketInstance, setSocketInstance] = useState(null);
  

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await API.get("/auth/me", { withCredentials: true });
// //         setUser(res.data);
// //       } catch {
// //         setUser(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   useEffect(() => {
// //     if (!user) {
// //       if (socketInstance) socketInstance.disconnect();
// //       return;
// //     }

// //     const s = io("http://localhost:5000", {
// //       withCredentials: true,
// //       auth: { userId: user._id }
// //     });

// //     setSocketInstance(s);

// //     s.on("notification", (data) => {
// //       setLiveNotifications((prev) => [data, ...prev]);
// //     });

// //     return () => s.disconnect();
// //   }, [user]);

// //   return (
// //     <AuthContext.Provider value={{ user, setUser, loading, liveNotifications, setLiveNotifications, socket: socketInstance }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import API from "../api/axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [liveNotifications, setLiveNotifications] = useState([]);
//   const [socket, setSocket] = useState(null);

//   // 1. Fetch User on Load
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await API.get("/auth/me", { withCredentials: true });
//         setUser(res.data);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   // 2. Handle Socket Connection
//   useEffect(() => {
//     if (!user) {
//       if (socket) socket.disconnect();
//       return;
//     }

//     const newSocket = io("http://localhost:5000", {
//       withCredentials: true,
//       auth: { userId: user._id }
//     });

//     newSocket.on("connect", () => {
//       console.log("🟢 Socket Connected to Server! My ID:", newSocket.id);
//     });

//     newSocket.on("notification", (data) => {
//       console.log("🔔 New Real-time Notification:", data);
//       setLiveNotifications((prev) => [data, ...prev]);
//     });

//     newSocket.on("connect_error", (err) => {
//       console.error("🔴 Socket Connection Error:", err.message);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.off("notification");
//       newSocket.disconnect();
//     };
//   }, [user]);

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         user, 
//         setUser, 
//         loading, 
//         liveNotifications, 
//         setLiveNotifications, 
//         socket 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  // 1. Initial Auth Check
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 2. Real-time Socket Connection
  useEffect(() => {
  if (!user?._id) return;

  const newSocket = io("http://localhost:5000", {
    withCredentials: true,
    auth: { userId: user._id }
  });

  newSocket.on("connect", () => {
    console.log("🟢 Connected to Socket.io Server!");
  });

  newSocket.on("notification", (data) => {
    setLiveNotifications((prev) => [data, ...prev]);
  });

  newSocket.on("connect_error", (err) => {
    console.error("🔴 Socket Error:", err.message);
  });

  setSocket(newSocket);

  return () => {
    newSocket.disconnect();
  };
}, [user?._id]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        loading, 
        liveNotifications, 
        setLiveNotifications, 
        socket 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);