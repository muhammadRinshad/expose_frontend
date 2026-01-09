
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/auth.css"
// import "./styles/global.css"
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/profile.css";
import "./styles/editProfile.css";
import "./styles/searchpage.css";
import "./styles/ImageCropper.css";
import "./styles/addPost.css";
import "./styles/preview.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
