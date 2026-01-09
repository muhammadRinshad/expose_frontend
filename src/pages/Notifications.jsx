// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function Notifications() {
//   const [requests, setRequests] = useState([]);

//   const fetchNotifications = async () => {
//     const res = await API.get("/users/notifications", {
//       withCredentials: true
//     });
//     setRequests(res.data.followRequests);
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const accept = async (id) => {
//     await API.post(`/users/accept/${id}`, {}, { withCredentials: true });
//     fetchNotifications();
//   };

//   const reject = async (id) => {
//     await API.post(`/users/reject/${id}`, {}, { withCredentials: true });
//     fetchNotifications();
//   };

//   return (
//     <div className="search-page page-wrapper">
//       <h2 style={{ marginBottom: 20 }}>Notifications</h2>

//       {requests.length === 0 && (
//         <p className="private-note">No new notifications</p>
//       )}

//       {requests.map((u) => (
//         <div key={u._id} className="search-user-card">
//           {u.avatar ? (
//             <img src={u.avatar} className="search-avatar" />
//           ) : (
//             <div className="search-avatar">
//               {u.username[0].toUpperCase()}
//             </div>
//           )}

//           <div className="search-user-info">
//             <span className="search-username">{u.username}</span>
//             <span className="search-followers">sent you a follow request</span>
//           </div>

//           <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
//             <button className="edit-profile-btn" onClick={() => accept(u._id)}>
//               Accept
//             </button>
//             <button
//               className="edit-profile-btn"
//               style={{ background: "#eee", color: "#000" }}
//               onClick={() => reject(u._id)}
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Notifications() {
  const [requests, setRequests] = useState([]);

  const fetchNotifications = async () => {
    const res = await API.get("/users/notifications", { withCredentials: true });
    setRequests(res.data.followRequests);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const accept = async (id) => {
    await API.post(`/users/accept/${id}`, {}, { withCredentials: true });
    fetchNotifications();
  };

  const reject = async (id) => {
    await API.post(`/users/reject/${id}`, {}, { withCredentials: true });
    fetchNotifications();
  };

  return (
    <div className="search-page page-wrapper">
      <h2 style={{ marginBottom: 20 }}>Notifications</h2>

      {requests.length === 0 && <p className="private-note">No new notifications</p>}

      {requests.map((u) => (
        <div key={u._id} className="search-user-card">
          {u.avatar ? (
            <img src={u.avatar} className="search-avatar" />
          ) : (
            <div className="search-avatar">{u.username[0].toUpperCase()}</div>
          )}

          <div className="search-user-info">
            <span className="search-username">{u.username}</span>
            <span className="search-followers">sent you a follow request</span>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className="edit-profile-btn" onClick={() => accept(u._id)}>
              Accept
            </button>
            <button
              className="edit-profile-btn"
              style={{ background: "#eee", color: "#000" }}
              onClick={() => reject(u._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
