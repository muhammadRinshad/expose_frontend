import { useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ImageCropper from "../components/ImageCropper";
import getCroppedImg from "../utils/cropImage";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    bio: "",
    isPrivate: false
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        isPrivate: user.isPrivate || false
      });
      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setDirty(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 IMAGE SELECT (OPEN CROPPER)
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDirty(true);

    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 AFTER CROPPING
  const onCropDone = async (cropPixels) => {
    const blob = await getCroppedImg(rawImage, cropPixels);

    setAvatarFile(blob);
    setAvatarPreview(URL.createObjectURL(blob));
    setShowCropper(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("bio", form.bio);
      data.append("isPrivate", form.isPrivate);
      if (avatarFile) data.append("avatar", avatarFile);

      const res = await API.put("/auth/edit", data, {
        withCredentials: true
      });

      setUser(res.data);
      setDirty(false);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile page-wrapper">
      <h1>Edit Profile</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit} className="login-form">

        {/* 🔥 AVATAR */}
        <div className="avatar-edit">
          <div className="avatar-preview">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" />
            ) : (
              user?.username?.[0]?.toUpperCase()
            )}
          </div>

          <label className="avatar-upload-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              hidden
            />
          </label>
        </div>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          rows="3"
          value={form.bio}
          onChange={handleChange}
        />

        {/* 🔐 PRIVATE */}
        <div className="toggle-row">
          <span>Private Account</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={form.isPrivate}
              onChange={(e) => {
                setDirty(true);
                setForm({ ...form, isPrivate: e.target.checked });
              }}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="edit-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>

          {dirty && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 🔥 CROPPER MODAL */}
      {showCropper && (
        <ImageCropper
          image={rawImage}
          onCropDone={onCropDone}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}
