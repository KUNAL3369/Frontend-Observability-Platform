import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { signOut } = useAuthStore();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-gray-800 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="w-60 h-screen flex flex-col bg-[#020617] border-r border-gray-800">
      
      {/* Top Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-6">
          Observability
        </h2>

        <nav className="space-y-2">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Overview
          </Link>

          <Link to="/performance" className={linkClass("/performance")}>
            Performance
          </Link>

          <Link to="/errors" className={linkClass("/errors")}>
            Errors
          </Link>
        </nav>
      </div>

      {/* Push content up */}
      <div className="flex-1" />

      {/* Bottom Section (Sign Out) */}
      <div className="p-4">
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 text-sm text-red-400 border border-red-500/20 rounded-lg py-2 hover:bg-red-500/10 transition"
        >
          ⏻ Sign Out
        </button>
      </div>
    </div>
  );
}