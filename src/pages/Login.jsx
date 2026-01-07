
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        identifier,
        password,
      });

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="login-page">
      <h1 className="brand">Expose</h1>

      <form className="login-form" onSubmit={submit}>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

       <button
  type="button"
  className="google-btn"
  onClick={googleLogin}
>
  <img
    src="/google.svg"
    alt="Google"
    className="google-icon"
  />
  Continue with Google
</button>
<p className="auth-switch">
  Don’t have an account?
  <span onClick={() => navigate("/register")}>
    Create account
  </span>
</p>

      </form>
    </div>
  );
}
