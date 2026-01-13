
import { useEffect, useState } from "react";
import API from "../api/axios";

// Standard import for react-multi-carousel
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Icons (You can use Lucide-react or FontAwesome, here I'll use text/emoji for simplicity but styled)
const Carousel =
  CarouselModule.default?.default ||
  CarouselModule.default ||
  CarouselModule;

const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userRes = await API.get("/auth/me", { withCredentials: true });
        const me = userRes.data;
        setCurrentUser(me);

        const followingIds = (me.following || []).map((f) =>
          typeof f === "string" ? f : f._id
        );

        const postsRes = await API.get("/posts", { withCredentials: true });

        const filteredPosts = postsRes.data.filter((post) => {
          const postOwnerId = typeof post.user === "string" ? post.user : post.user._id;
          if (postOwnerId === me._id) return true;
          if (!post.user.isPrivate) return true;
          return followingIds.includes(postOwnerId);
        });

        setPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ HANDLER: Toggle Like with Optimistic UI update
  const handleLike = async (postId) => {
    if (!currentUser) return;

    // 1. Update UI immediately (Optimistic Update)
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const isLiked = post.likes.includes(currentUser._id);
          const updatedLikes = isLiked
            ? post.likes.filter((id) => id !== currentUser._id) // Remove like
            : [...post.likes, currentUser._id]; // Add like
          
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );

    // 2. Sync with Backend
    try {
      await API.post(`/posts/like/${postId}`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Failed to like post", err);
      // Optional: Revert UI state if API fails
    }
  };

  if (loading) {
    return (
      <div className="feed">
        <div className="feed-card skeleton" style={{ height: 300 }} />
        <div className="feed-card skeleton" style={{ height: 300 }} />
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="feed">
        <div className="feed-card">
          <h3>No posts available</h3>
          <p>Posts from private accounts you follow or public users will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.map((post) => {
        const hasMultipleImages = post.images.length > 1;
        // ✅ Check if current user liked this specific post
        const isLikedByMe = currentUser && post.likes.includes(currentUser._id);

        return (
          <div key={post._id} className="feed-card post-card">
            {/* Header */}
            <div className="post-header">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${post.user.avatar || "/default-avatar.png"})`,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundSize: "cover"
                }}
              />
              <span className="username" style={{ marginLeft: 10, fontWeight: "bold" }}>
                {post.user.username}
              </span>
            </div>

            {/* Images Carousel */}
            <Carousel
              swipeable={hasMultipleImages}
              draggable={hasMultipleImages}
              showDots={hasMultipleImages}
              arrows={hasMultipleImages}
              responsive={responsive}
              containerClass="post-images-carousel"
              itemClass="post-image-item"
              infinite={hasMultipleImages}
              keyBoardControl={hasMultipleImages}
              customTransition="all .5"
              transitionDuration={500}
              removeArrowOnDeviceType={["mobile"]}
            >
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`post-${i}`}
                  className="post-image"
                  style={{
                    width: "100%",
                    maxHeight: 450,
                    borderRadius: 12,
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ))}
            </Carousel>

            {/* ✅ UPDATED: Instagram Like Button */}
            <div className="post-actions">
              <button
                className={`like-btn ${isLikedByMe ? "liked" : ""}`}
                onClick={() => handleLike(post._id)}
              >
                {isLikedByMe ? "❤️" : "🤍"}
              </button>
              <span className="likes-count">
                <strong>{post.likes.length} likes</strong>
              </span>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="post-caption" style={{ marginTop: 5 }}>
                <strong>{post.user.username}</strong> {post.caption}
              </div>
            )}

            {/* Timestamp */}
            <div className="post-time" style={{ fontSize: "0.75rem", color: "#888", marginTop: 5 }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}