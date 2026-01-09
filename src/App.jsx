
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import DashboardLayout from "./layouts/DashboardLayout";

// /* Pages */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";
// import Search from "./pages/Search";
// import UserProfile from "./pages/UserProfile";
// import Notifications from "./pages/Notifications";

// export default function App() {
//   return (
//     <Routes>
//       {/* ================= PUBLIC ================= */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* ================= HOME ================= */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Home />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= SEARCH ================= */}
//       <Route
//         path="/search"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Search />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= OWN PROFILE (NO PARAMS) ================= */}
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Profile />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />

//       {/* ================= EDIT PROFILE ================= */}
//       <Route
//         path="/edit-profile"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <EditProfile />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
// <Route
//   path="/notifications"
//   element={
//     <ProtectedRoute>
//       <DashboardLayout>
//         <Notifications />
//       </DashboardLayout>
//     </ProtectedRoute>
//   }
// />

//       {/* ================= OTHER USER PROFILE ================= */}
//       <Route
//         path="/user/:username"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <UserProfile />
//             </DashboardLayout>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import AddPost from "./pages/AddPost"; // ✅ NEW
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= HOME ================= */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ErrorBoundary>
              <Home />
              </ErrorBoundary>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= ADD POST ================= */}
      <Route
        path="/new-post"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AddPost />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= SEARCH ================= */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Search />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= NOTIFICATIONS ================= */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= OWN PROFILE ================= */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= EDIT PROFILE ================= */}
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EditProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= OTHER USER PROFILE ================= */}
      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
