
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
//             <img
//               src={u.avatar || "/avatar-placeholder.png"}
//               alt="avatar"
//               className="search-avatar"
//             />

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

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get(`/users?search=${query}`);
        setUsers(res.data);
      } catch {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="search-page page-wrapper">
      {/* 🔍 STICKY SEARCH BAR */}
      <div className="search-bar-fixed">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
            {/* AVATAR */}
            {u.avatar ? (
              <img
                src={u.avatar}
                alt="avatar"
                className="search-avatar"
              />
            ) : (
              <div className="search-avatar-fallback">
                {u.username?.[0]?.toUpperCase()}
              </div>
            )}

            <div className="search-user-info">
              <span className="search-username">{u.username}</span>
              <span className="search-followers">
                {u.followers?.length || 0} followers
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
