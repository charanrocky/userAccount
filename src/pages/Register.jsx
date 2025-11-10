import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      register(form.name, form.email, form.password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Join <span className="text-indigo-400 font-semibold">AccountApp</span>{" "}
          and start your journey today.
        </p>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-md px-3 py-2 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
