
// // import { useEffect, useState } from "react";
// // import API from "../api/axios";
// // import { useNavigate } from "react-router-dom";

// // export default function Search() {
// //   const [query, setQuery] = useState("");
// //   const [users, setUsers] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await API.get(`/users?search=${query}`);
// //         setUsers(res.data);
// //       } catch {
// //         setUsers([]);
// //       }
// //     };

// //     fetchUsers();
// //   }, [query]);

// //   return (
// //     <div className="search-page page-wrapper">
// //       {/* 🔍 STICKY SEARCH BAR */}
// //       <div className="search-bar-fixed">
// //         <input
// //           type="text"
// //           placeholder="Search users..."
// //           className="search-input"
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //         />
// //       </div>

// //       {/* RESULTS */}
// //       <div className="search-results">
// //         {users.map((u) => (
// //           <div
// //             key={u._id}
// //             className="search-user-card"
// //             onClick={() => navigate(`/user/${u.username}`)}
// //           >
// //             <img
// //               src={u.avatar || "/avatar-placeholder.png"}
// //               alt="avatar"
// //               className="search-avatar"
// //             />

// //             <div className="search-user-info">
// //               <span className="search-username">{u.username}</span>
// //               <span className="search-followers">
// //                 {u.followers?.length || 0} followers
// //               </span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Search() {
//   const [query, setQuery] = useState("");
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await API.get(`/users?search=${query}`);
//         setUsers(res.data);
//       } catch {
//         setUsers([]);
//       }
//     };

//     fetchUsers();
//   }, [query]);

//   return (
//     <div className="search-page page-wrapper">
//       {/* 🔍 STICKY SEARCH BAR */}
//       <div className="search-bar-fixed">
//         <input
//           type="text"
//           placeholder="Search users..."
//           className="search-input"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {/* RESULTS */}
//       <div className="search-results">
//         {users.map((u) => (
//           <div
//             key={u._id}
//             className="search-user-card"
//             onClick={() => navigate(`/user/${u.username}`)}
//           >
//             {/* AVATAR */}
//             {u.avatar ? (
//               <img
//                 src={u.avatar}
//                 alt="avatar"
//                 className="search-avatar"
//               />
//             ) : (
//               <div className="search-avatar-fallback">
//                 {u.username?.[0]?.toUpperCase()}
//               </div>
//             )}

//             <div className="search-user-info">
//               <span className="search-username">{u.username}</span>
//               <span className="search-followers">
//                 {u.followers?.length || 0} followers
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
// import "../styles/search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get(`/users?search=${query}`, {
          withCredentials: true,
        });

        // add follow state per user
        const usersWithState = res.data.map((u) => ({
          ...u,
          followState: u.isFollowing
            ? "following"
            : u.isRequested
            ? "requested"
            : "follow",
        }));

        setUsers(usersWithState);
      } catch {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [query]);

  const handleFollow = async (e, userId) => {
    e.stopPropagation();

    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId
          ? {
              ...u,
              followState:
                u.followState === "following" ? "follow" : "following",
            }
          : u
      )
    );

    try {
      const res = await API.post(
        `/users/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      setUsers((prev) =>
        prev.map((u) => {
          if (u._id !== userId) return u;

          if (res.data.requested === true) {
            return { ...u, followState: "requested" };
          }
          if (res.data.requested === false) {
            return { ...u, followState: "follow" };
          }
          if (res.data.following === true) {
            return { ...u, followState: "following" };
          }
          return { ...u, followState: "follow" };
        })
      );
    } catch {
      // rollback
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, followState: "follow" } : u
        )
      );
    }
  };

  return (
    <div className="search-page">
      {/* 🔍 SEARCH BAR */}
      <div className="search-bar-fixed">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* RESULTS */}
      <div className="search-results">
        {users.map((u) => (
          <div
            key={u._id}
            className="search-user-card"
            onClick={() => navigate(`/user/${u.username}`)}
          >
            {/* Avatar */}
            {u.avatar ? (
              <img src={u.avatar} alt="avatar" className="search-avatar" />
            ) : (
              <div className="search-avatar-fallback">
                {u.username[0]?.toUpperCase()}
              </div>
            )}

            {/* Info */}
            <div className="search-user-info">
              <span className="search-username">{u.username}</span>
              <span className="search-followers">
                {u.followers?.length || 0} followers
              </span>
            </div>

            {/* Follow Button */}
            <button
              className={`follow-btn ${u.followState}`}
              onClick={(e) => handleFollow(e, u._id)}
            >
              {u.followState === "following"
                ? "Following"
                : u.followState === "requested"
                ? "Requested"
                : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
