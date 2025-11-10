import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else setForm({ name: user.name, email: user.email });
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email) {
      setError("Both name and email are required");
      return;
    }

    try {
      updateUser(user.id, form.name, form.email);
      setSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Your Profile
        </h2>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-md px-3 py-2 mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-400 text-sm bg-green-900/30 border border-green-700 rounded-md px-3 py-2 mb-4 text-center">
            {success}
          </div>
        )}

        {editMode ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                type="submit"
                className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setError("");
                  setSuccess("");
                  setForm({ name: user.name, email: user.email });
                }}
                className="w-1/2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-gray-200 space-y-3">
            <p>
              <span className="font-semibold text-gray-400">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Email:</span>{" "}
              {user.email}
            </p>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
