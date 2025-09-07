import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const payload = { email, password };
      const { data } = await axios.post(
  `${import.meta.env.VITE_NODE_BACKEND_URL}/api/auth/login`,
  payload
);

      // Save user info
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Notify other listeners
      window.dispatchEvent(new Event("userChanged"));

      if (data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }

      toast.success("Login successful!");

      // Redirect
      if (data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.response?.status === 404
          ? "User does not exist"
          : err?.response?.status === 401
          ? "Invalid email or password"
          : "Login failed");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/abstract-programming-code-icon-laptop-screen-light-blue-low-poly-futuristic-style-technology-background_43780-10083.jpg?semt=ais_hybrid&w=740')",
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Sign in to dEventHub
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-medium ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline"
          >
            Create one
          </button>
        </p>
      </motion.form>
    </section>
  );
}
