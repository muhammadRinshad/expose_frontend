
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) => isActive ? "active" : ""}>
          Upcoming Messages
        </NavLink>

        <NavLink to="/new-post" className={({ isActive }) => isActive ? "active" : ""}>
          Add Post
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
