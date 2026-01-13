
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   if (!user) return null;

//   return (
//     <div className="profile">
//       <div className="profile-header">
//         {/* AVATAR */}
//         <div className="profile-avatar-wrapper">
//           {user?.avatar ? (
//             <img
//               src={user.avatar}
//               alt="profile avatar"
//               className="profile-avatar-img"
//             />
//           ) : (
//             <div className="profile-avatar-fallback">
//               {user?.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>

//         {/* INFO */}
//         <div className="profile-info">
//           <h2 className="profile-username">{user.username}</h2>
//           {/* <p className="profile-email">{user.email}</p> */}

//           {/* BIO */}
//           {user?.bio && (
//             <p className="profile-bio">{user.bio}</p>
//           )}

//           {/* STATS */}
//           <div className="profile-stats">
//             <span><strong>0</strong> Posts</span>
//             <span><strong>{user.followers?.length || 0}</strong> Followers</span>
//             <span><strong>{user.following?.length || 0}</strong> Following</span>
//           </div>

//           {/* EDIT PROFILE */}
//           <button
//             className="edit-profile-btn"
//             onClick={() => navigate("/edit-profile")}
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* EMPTY POSTS */}
//       <div className="profile-empty">
//         No posts yet
//       </div>
//     </div>
//   );
// }
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchMyPosts = async () => {
      try {
        const res = await API.get(`/posts/user/${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyPosts();
  }, [user?._id]);

  if (!user) return null;

  return (
    <div className="profile page-wrapper">
      <div className="profile-header">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-fallback">
              {user.username[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="profile-info">
          <h2 className="profile-username">{user.username}</h2>

          {user.bio && <p className="profile-bio">{user.bio}</p>}

          <div className="profile-stats">
            <span><strong>{posts.length}</strong> Posts</span>
            <span><strong>{user.followers?.length || 0}</strong> Followers</span>
            <span><strong>{user.following?.length || 0}</strong> Following</span>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* POSTS GRID */}
      {posts.length === 0 ? (
        <div className="profile-empty">No posts yet</div>
      ) : (
        <div className="profile-posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="profile-post-card">
              <img src={post.image} alt="post" />
              <div className="post-overlay">
                ❤️ {post.likesCount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
