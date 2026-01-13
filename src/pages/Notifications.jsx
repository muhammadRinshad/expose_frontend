
// // import { useEffect, useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import API from "../api/axios";

// // export default function Notifications() {
// //   const { liveNotifications, setLiveNotifications } = useAuth(); // 👈 Added setLiveNotifications
// //   const [items, setItems] = useState([]);

// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await API.get("/users/notifications");
// //       setItems(res.data.notifications);
// //     } catch (err) {
// //       console.error("Fetch error", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, []);

// //   // Merge them and provide a fallback ID for keys
// //   const mergedNotifications = [...liveNotifications, ...items];

// //   const accept = async (senderId) => {
// //     await API.post(`/users/accept/${senderId}`);
// //     // ✅ Remove from live notifications if it was there
// //     setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
// //     fetchNotifications();
// //   };

// //   const reject = async (senderId) => {
// //     await API.post(`/users/reject/${senderId}`);
// //     setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
// //     fetchNotifications();
// //   };

// //   return (
// //     <div className="search-page page-wrapper">
// //       <h2>Notifications</h2>
// //       {mergedNotifications.map((n, index) => (
// //         <div key={n._id || `live-${index}`} className="search-user-card"> {/* 👈 Fixed Key */}
// //           <img 
// //              src={n.sender.avatar || "/default-avatar.png"} 
// //              className="search-avatar" 
// //           />
// //           <div className="search-user-info">
// //             <span className="search-username">{n.sender.username}</span>
// //             <span className="search-followers">
// //                {n.type === "follow_request" ? "sent you a follow request" : "liked your post ❤️"}
// //             </span>
// //           </div>

// //           {n.type === "follow_request" && (
// //             <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
// //               <button className="edit-profile-btn" onClick={() => accept(n.sender._id)}>Accept</button>
// //               <button className="edit-profile-btn" style={{ background: "#eee", color: "#000" }} onClick={() => reject(n.sender._id)}>Reject</button>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import API from "../api/axios";

// export default function Notifications() {
//   const { liveNotifications, setLiveNotifications } = useAuth();
//   const [items, setItems] = useState([]);

//   const fetchNotifications = async () => {
//     try {
//       const res = await API.get("/users/notifications");
//       setItems(res.data.notifications);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const mergedNotifications = [...liveNotifications, ...items];

//   const accept = async (senderId) => {
//     await API.post(`/users/accept/${senderId}`);
//     setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
//     fetchNotifications();
//   };

//   const reject = async (senderId) => {
//     await API.post(`/users/reject/${senderId}`);
//     setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
//     fetchNotifications();
//   };

//   return (
//     <div className="search-page page-wrapper">
//       <h2 style={{ paddingBottom: '20px', borderBottom: '1px solid #dbdbdb', marginBottom: '10px' }}>Notifications</h2>
      
//       {mergedNotifications.length === 0 && <p style={{ textAlign: 'center', color: '#8e8e8e', marginTop: '20px' }}>No notifications yet.</p>}

//       {mergedNotifications.map((n, index) => (
//         <div key={n._id || `live-${index}`} className="search-user-card" style={{ padding: '12px 0', borderBottom: 'none' }}>
//           <img 
//             src={n.sender.avatar || "/default-avatar.png"} 
//             className="search-avatar" 
//             style={{ width: '44px', height: '44px' }}
//           />
//           <div className="search-user-info" style={{ flex: 1 }}>
//             <span className="search-username" style={{ fontSize: '14px' }}>{n.sender.username}</span>
//             <span className="search-followers" style={{ fontSize: '14px', color: '#262626' }}>
//                {n.type === "follow_request" && " sent you a follow request."}
//                {n.type === "like" && " liked your post."}
//                {n.type === "follow_accept" && " accepted your follow request."}
//                {n.type === "follow" && " started following you."}
//             </span>
//           </div>

//           {/* RIGHT SIDE: Action Buttons for Follow Requests */}
//           {n.type === "follow_request" && (
//             <div style={{ display: "flex", gap: 8 }}>
//               <button className="edit-profile-btn" onClick={() => accept(n.sender._id)} style={{ background: '#0095f6', color: '#fff', border: 'none' }}>Confirm</button>
//               <button className="edit-profile-btn" onClick={() => reject(n.sender._id)} style={{ background: "#efefef", color: "#000", border: 'none' }}>Delete</button>
//             </div>
//           )}

//           {/* RIGHT SIDE: Post Thumbnail for Likes */}
//           {n.type === "like" && n.post?.images?.[0] && (
//             <img 
//               src={n.post.images[0]} 
//               alt="post" 
//               style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Notifications() {
  const { liveNotifications, setLiveNotifications } = useAuth();
  const [items, setItems] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/users/notifications");
      setItems(res.data.notifications);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Clear live notifications when viewing the page so they don't double up
    // return () => setLiveNotifications([]); 
  }, []);

  // Combined and Sorted: Latest notifications (by createdAt) at the top
  const mergedNotifications = [...liveNotifications, ...items].sort((a, b) => {
    const dateA = new Date(a.createdAt || Date.now());
    const dateB = new Date(b.createdAt || Date.now());
    return dateB - dateA;
  });

  const accept = async (senderId) => {
    try {
      await API.post(`/users/accept/${senderId}`);
      // Remove from live view immediately
      setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (senderId) => {
    try {
      await API.post(`/users/reject/${senderId}`);
      // Remove from live view immediately
      setLiveNotifications(prev => prev.filter(n => n.sender._id !== senderId));
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search-page page-wrapper">
      <h2 style={{ 
        paddingBottom: '20px', 
        borderBottom: '1px solid #dbdbdb', 
        marginBottom: '10px',
        fontWeight: '600'
      }}>
        Notifications
      </h2>
      
      {mergedNotifications.length === 0 && (
        <p style={{ textAlign: 'center', color: '#8e8e8e', marginTop: '20px' }}>
          No notifications yet.
        </p>
      )}

      {mergedNotifications.map((n, index) => (
        <div key={n._id || `live-${index}`} className="search-user-card" style={{ padding: '12px 0', borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
          <img 
            src={n.sender.avatar || "/default-avatar.png"} 
            className="search-avatar" 
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div className="search-user-info" style={{ flex: 1, marginLeft: '12px' }}>
            <span className="search-username" style={{ fontSize: '14px', fontWeight: '600' }}>
                {n.sender.username}
            </span>
            <span className="search-followers" style={{ fontSize: '14px', color: '#262626', marginLeft: '4px' }}>
               {n.type === "follow_request" && "sent you a follow request."}
               {n.type === "like" && "liked your post."}
               {n.type === "follow_accept" && "accepted your follow request."}
               {n.type === "follow" && "started following you."}
            </span>
          </div>

          {/* RIGHT SIDE: Action Buttons for Follow Requests */}
          {n.type === "follow_request" && (
            <div style={{ display: "flex", gap: 8 }}>
              <button 
                className="edit-profile-btn" 
                onClick={() => accept(n.sender._id)} 
                style={{ background: '#0095f6', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
              >
                Confirm
              </button>
              <button 
                className="edit-profile-btn" 
                onClick={() => reject(n.sender._id)} 
                style={{ background: "#efefef", color: "#000", border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
              >
                Delete
              </button>
            </div>
          )}

          {/* RIGHT SIDE: Post Thumbnail for Likes */}
          {n.type === "like" && (n.post?.images?.[0] || n.postImage) && (
            <img 
              src={n.post?.images?.[0] || n.postImage} 
              alt="post" 
              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginLeft: '10px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}