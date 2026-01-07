import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Expose</div>
      <div className="navbar-right">
        <span className="navbar-user">{user?.username}</span>
        <button className="navbar-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
