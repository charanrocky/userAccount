import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-semibold tracking-wide hover:text-indigo-400 transition-colors"
        >
          Account<span className="text-indigo-500">App</span>
        </Link>

        {/* Right-side links */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-600 rounded-lg hover:bg-gray-800 hover:text-indigo-400 transition-all"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-600 rounded-lg hover:bg-gray-800 hover:text-indigo-400 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
