
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Messages
        </NavLink>

        <NavLink
          to="/new-post"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Post
        </NavLink>

        {/* 🔍 SEARCH */}
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Search
        </NavLink>

        {/* 🔔 NOTIFICATIONS */}
        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Notifications
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
