import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./NavBar";

// Shared shell for role-protected routes (admin, teacher, etc.).
// Sidebar manages its own mobile open/close state and collapses to an
// off-canvas drawer below md; Navbar and the routed page content sit
// in the remaining column.
function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />

        <main className="flex-1 bg-white overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;