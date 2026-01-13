
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followingState, setFollowingState] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${username}`, {
        withCredentials: true
      });

      setUser(res.data);

      if (res.data.isRequested) setFollowingState("requested");
      else if (res.data.isFollowing) setFollowingState("following");
      else setFollowingState("follow");

      /* 🔒 FETCH POSTS ONLY IF ALLOWED */
      if (
        !res.data.isPrivate ||
        res.data.isOwner ||
        res.data.isFollowing
      ) {
        const postRes = await API.get(`/posts/user/${res.data._id}`);
        setPosts(postRes.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const handleFollow = async () => {
    if (!user?._id) return;

    try {
      const res = await API.post(
        `/users/follow/${user._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.requested === true) setFollowingState("requested");
      else if (res.data.requested === false) setFollowingState("follow");
      else
        setFollowingState(prev =>
          prev === "following" ? "follow" : "following"
        );

      fetchProfile();
    } catch {
      fetchProfile();
    }
  };

  if (loading || !user) return null;

  /* 🔑 SINGLE SOURCE OF TRUTH */
  const canViewFullProfile =
    !user.isPrivate || user.isOwner || followingState === "following";

  return (
    <div className="profile page-wrapper">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-fallback">
              {user.username[0].toUpperCase()}
            </div>
          )}
        </div>

        <div className="profile-info">
          <h2 className="profile-username">{user.username}</h2>

          {/* BIO */}
          {canViewFullProfile && user.bio && (
            <p className="profile-bio">{user.bio}</p>
          )}

          {/* STATS (FIXED 🔥) */}
          {canViewFullProfile && (
            <div className="profile-stats">
              <span><strong>{posts.length}</strong> Posts</span>
              <span><strong>{user.followers?.length || 0}</strong> Followers</span>
              <span><strong>{user.following?.length || 0}</strong> Following</span>
            </div>
          )}

          {/* FOLLOW BUTTON */}
          {!user.isOwner && (
            <button className="edit-profile-btn" onClick={handleFollow}>
              {followingState === "requested"
                ? "Requested"
                : followingState === "following"
                ? "Following"
                : "Follow"}
            </button>
          )}

          {/* PRIVATE NOTE */}
          {user.isPrivate && !canViewFullProfile && (
            <p className="private-note">
              This account is private. Follow to see posts.
            </p>
          )}
        </div>
      </div>

      {/* POSTS */}
      {!canViewFullProfile ? (
        <div className="profile-empty">Private Account</div>
      ) : posts.length === 0 ? (
        <div className="profile-empty">No posts yet</div>
      ) : (
        <div className="profile-posts-grid">
          {posts.map(post => (
            <div key={post._id} className="profile-post-card">
              <img src={post.image} alt="post" />
              <div className="post-overlay">❤️ {post.likesCount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
