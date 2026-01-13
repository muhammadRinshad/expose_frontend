
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function NotificationPopup() {
//   const { socket } = useAuth(); // Now this works because it's in the Provider
//   const [popup, setPopup] = useState(null);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNotif = (data) => {
//       setPopup(data);
//       setTimeout(() => setPopup(null), 4000);
//     };

//     socket.on("notification", handleNotif);
//     return () => socket.off("notification", handleNotif);
//   }, [socket]);

//   if (!popup) return null;

//   const getMessage = () => {
//     if (popup.type === "like") return "liked your post ❤️";
//     if (popup.type === "follow_request") return "sent you a follow request 👤";
//     if (popup.type === "follow_accept") return "accepted your follow request ✅";
//     return "interacted with you";
//   };

//   return (
//     <div className="notif-popup">
//       <img src={popup.sender.avatar || "/default-avatar.png"} alt="avatar" />
//       <span>
//         <strong>{popup.sender.username}</strong> {getMessage()}
//       </span>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function NotificationPopup() {
  const { socket } = useAuth();
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNotif = (data) => {
      setPopup(data);
      setTimeout(() => setPopup(null), 5000);
    };

    socket.on("notification", handleNotif);
    return () => socket.off("notification", handleNotif);
  }, [socket]);

  if (!popup) return null;

  const getMessage = () => {
    if (popup.type === "like") return "liked your post.";
    if (popup.type === "follow_request") return "requested to follow you.";
    if (popup.type === "follow_accept") return "accepted your follow request.";
    if (popup.type === "follow") return "started following you.";
    return "interacted with you.";
  };

  return (
    <div className="notif-popup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={popup.sender.avatar || "/default-avatar.png"} 
          alt="avatar" 
          style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <span style={{ fontSize: '14px' }}>
          <strong>{popup.sender.username}</strong> {getMessage()}
        </span>
      </div>
      
      {/* Instagram Style: Show Post Image on the right if it's a like */}
      {popup.type === "like" && popup.postImage && (
        <img 
          src={popup.postImage} 
          alt="post" 
          style={{ width: '35px', height: '35px', borderRadius: '4px', objectFit: 'cover', marginLeft: '10px' }}
        />
      )}
    </div>
  );
}