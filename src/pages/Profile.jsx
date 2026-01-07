
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="profile">
      <div className="profile-header">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="profile avatar"
              className="profile-avatar-img"
            />
          ) : (
            <div className="profile-avatar-fallback">
              {user?.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="profile-info">
          <h2 className="profile-username">{user.username}</h2>
          {/* <p className="profile-email">{user.email}</p> */}

          {/* BIO */}
          {user?.bio && (
            <p className="profile-bio">{user.bio}</p>
          )}

          {/* STATS */}
          <div className="profile-stats">
            <span><strong>0</strong> Posts</span>
            <span><strong>0</strong> Followers</span>
            <span><strong>0</strong> Following</span>
          </div>

          {/* EDIT PROFILE */}
          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* EMPTY POSTS */}
      <div className="profile-empty">
        No posts yet
      </div>
    </div>
  );
}
