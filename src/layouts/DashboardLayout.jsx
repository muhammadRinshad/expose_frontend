// import Navbar from "../components/Navbar";
// import Sidebar from "../components/sidebar";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="dashboard">
//       <aside className="dashboard-sidebar">
//         <Sidebar />
//       </aside>
      
//       <section className="dashboard-main">
//         <Navbar />
//         <main className="dashboard-content page-wrapper">
//           {children}
//         </main>
//       </section>
//     </div>
//   );
// }
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotificationPopup from "../components/NotificationPopup";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      {/* ================= SIDEBAR ================= */}
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      {/* ================= MAIN ================= */}
      <section className="dashboard-main">
        <Navbar />

        {/* 🔔 REAL-TIME NOTIFICATION POPUP */}
        <NotificationPopup />

        {/* ================= PAGE CONTENT ================= */}
        <main className="dashboard-content page-wrapper">
          {children}
        </main>
      </section>
    </div>
  );
}
