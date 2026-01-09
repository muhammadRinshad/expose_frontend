
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function UserProfile() {
//   const { username } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [followingState, setFollowingState] = useState(null); // following/requested

//   const fetchProfile = async () => {
//     const res = await API.get(`/users/${username}`, { withCredentials: true });
//     setUser(res.data);

//     if (res.data.isRequested) setFollowingState("requested");
//     else if (res.data.isFollowing) setFollowingState("following");
//     else setFollowingState("follow");
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [username]);

//   const handleFollow = async () => {
//     if (!user?._id) return; // safety check
//     const res = await API.post(`/users/follow/${user._id}`, {}, { withCredentials: true });
//     if (res.data.requested) setFollowingState("requested");
//     else setFollowingState((prev) => (prev === "following" ? "follow" : "following"));
//   };

//   if (loading || !user) return null;

//   return (
//     <div className="profile page-wrapper">
//       <div className="profile-header">
//         <div className="profile-avatar-wrapper">
//           {user.avatar ? (
//             <img src={user.avatar} alt="avatar" className="profile-avatar-img" />
//           ) : (
//             <div className="profile-avatar-fallback">
//               {user.username[0].toUpperCase()}
//             </div>
//           )}
//         </div>

//         <div className="profile-info">
//           <h2 className="profile-username">{user.username}</h2>
//           {user.bio && <p className="profile-bio">{user.bio}</p>}

//           <div className="profile-stats">
//             <span><strong>0</strong> Posts</span>
//             <span><strong>{user.followers?.length || 0}</strong> Followers</span>
//             <span><strong>{user.following?.length || 0}</strong> Following</span>
//           </div>

//           {!user.isOwner && (
//             <button className="edit-profile-btn" onClick={handleFollow}>
//               {followingState === "requested"
//                 ? "Requested"
//                 : followingState === "following"
//                 ? "Following"
//                 : "Follow"}
//             </button>
//           )}

//           {user.isPrivate && !user.isOwner && followingState === "requested" && (
//             <p className="private-note">Follow request sent</p>
//           )}
//         </div>
//       </div>

//       <div className="profile-empty">No posts yet</div>
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followingState, setFollowingState] = useState(null); 
  // follow | following | requested

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${username}`, {
        withCredentials: true
      });

      setUser(res.data);

      if (res.data.isRequested) setFollowingState("requested");
      else if (res.data.isFollowing) setFollowingState("following");
      else setFollowingState("follow");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

 const handleFollow = async () => {
  if (!user?._id) return;

  // 🔥 OPTIMISTIC UI
  if (followingState === "following") {
    setUser((prev) => ({
      ...prev,
      followers: prev.followers.slice(0, -1)
    }));
  }

  try {
    const res = await API.post(
      `/users/follow/${user._id}`,
      {},
      { withCredentials: true }
    );

    if (res.data.requested === true) {
      setFollowingState("requested");
    } else if (res.data.requested === false) {
      setFollowingState("follow"); // ❌ canceled
    } else {
      setFollowingState((prev) =>
        prev === "following" ? "follow" : "following"
      );
    }
  } catch (err) {
    fetchProfile(); // rollback
  }
};


  if (loading || !user) return null;

  return (
    <div className="profile page-wrapper">
      <div className="profile-header">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="profile-avatar-img"
            />
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

          {/* STATS */}
          <div className="profile-stats">
            <span>
              <strong>0</strong> Posts
            </span>
            <span>
              <strong>{user.followers?.length || 0}</strong> Followers
            </span>
            <span>
              <strong>{user.following?.length || 0}</strong> Following
            </span>
          </div>

          {/* FOLLOW BUTTON */}
          {!user.isOwner && (
           <button
  className="edit-profile-btn"
  onClick={handleFollow}
>
  {followingState === "requested"
    ? "Requested"
    : followingState === "following"
    ? "Following"
    : "Follow"}
</button>

          )}

          {/* PRIVATE NOTE */}
          {user.isPrivate &&
            !user.isOwner &&
            followingState === "requested" && (
              <p className="private-note">Follow request sent</p>
            )}
        </div>
      </div>

      <div className="profile-empty">No posts yet</div>
    </div>
  );
}
