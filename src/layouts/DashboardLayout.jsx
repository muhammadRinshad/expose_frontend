import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <section className="dashboard-main">
        <Navbar />
        <main className="dashboard-content page-wrapper">
          {children}
        </main>
      </section>
    </div>
  );
}
