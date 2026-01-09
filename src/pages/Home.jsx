import { useEffect, useState } from "react";
import API from "../api/axios";

// ✅ FIXED: Standard import for react-multi-carousel
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Carousel responsive breakpoints
const Carousel = CarouselModule.default?.default || CarouselModule.default || CarouselModule;

const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 1️⃣ Fetch current user
        const userRes = await API.get("/auth/me", { withCredentials: true });
        setUser(userRes.data);

        // 2️⃣ Fetch all posts
        const res = await API.get("/posts", { withCredentials: true });

        // 3️⃣ Filter private posts
        // Ensures we only see public posts, posts from people we follow, or our own
        const filtered = res.data.filter(
          (post) =>
            !post.user.isPrivate ||
            userRes.data.following.includes(post.user._id) ||
            post.user._id === userRes.data._id
        );

        setPosts(filtered);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 4️⃣ Loading skeleton state
  if (loading) {
    return (
      <div className="feed">
        <div className="feed-card skeleton" style={{ height: '300px', marginBottom: '20px', background: '#eee' }} />
        <div className="feed-card skeleton" style={{ height: '300px', marginBottom: '20px', background: '#eee' }} />
      </div>
    );
  }

  // 5️⃣ Empty state
  if (!posts.length) {
    return (
      <div className="feed">
        <div className="feed-card">
          <h3>No posts available</h3>
          <p>Posts from private users or your network will appear here.</p>
        </div>
      </div>
    );
  }

  // 6️⃣ Main Render
  return (
    <div className="feed">
      {posts.map((post) => (
        <div key={post._id} className="feed-card post-card">
          {/* Header */}
          <div className="post-header">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${post.user.avatar || "/default-avatar.png"})`,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundSize: 'cover'
              }}
            />
            <span className="username" style={{ marginLeft: '10px', fontWeight: 'bold' }}>
              {post.user.username}
            </span>
          </div>

          {/* Images Carousel */}
          <Carousel
            swipeable
            draggable
            showDots={post.images.length > 1}
            responsive={responsive}
            containerClass="post-images-carousel"
            itemClass="post-image-item"
            infinite
            autoPlay={false}
            keyBoardControl
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["mobile"]}
          >
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`post-content-${i}`}
                className="post-image"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "450px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            ))}
          </Carousel>

          {/* Caption */}
          {post.caption && (
            <div className="post-caption" style={{ marginTop: '10px' }}>
              <strong>{post.user.username}</strong> {post.caption}
            </div>
          )}

          {/* Timestamp */}
          <div className="post-time" style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}