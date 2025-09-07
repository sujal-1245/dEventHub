import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaTimes, FaCode } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const nav = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Theme toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Listen for login/logout changes
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("userInfo");
      setUser(stored ? JSON.parse(stored) : null);

      // Redirect after login if needed
      const redirectTo = localStorage.getItem("redirectTo");
      if (stored && redirectTo) {
        localStorage.removeItem("redirectTo");
        nav(redirectTo);
      }
    };
    window.addEventListener("userChanged", syncUser);
    return () => window.removeEventListener("userChanged", syncUser);
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    nav("/login");
  };

  const isAdmin = user?.isAdmin;

  // Generic protected link handler
  const handleProtectedClick = (e, redirectPath) => {
    if (!user) {
      e.preventDefault(); // stop navigation
      setShowLoginModal(true);
      localStorage.setItem("redirectTo", redirectPath); // store where to redirect after login
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false); // close modal
    nav("/login"); // navigate to login
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white dark:bg-[#023047] shadow-md transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold text-[#219ebc] dark:text-[#8ecae6] hover:text-[#ffb703] dark:hover:text-[#ffb703] transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#004562] text-white shadow-md">
                <FaCode className="text-lg" />
              </div>
              dEventHub
            </Link>

            <nav className="hidden md:flex gap-6 text-sm font-medium text-[#023047] dark:text-[#e8f4fa]">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="hover:text-[#fb8500] dark:hover:text-[#fb8500] transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/events"
                    className="hover:text-[#fb8500] dark:hover:text-[#fb8500] transition"
                  >
                    Events
                  </Link>
                  <Link
                    to="/EventRecommendations"
                    onClick={(e) =>
                      handleProtectedClick(e, "/EventRecommendations")
                    }
                    className="hover:text-[#fb8500] dark:hover:text-[#fb8500] transition"
                  >
                    Recommendations
                  </Link>
                  <Link
                    to="/ATSResume"
                    onClick={(e) => handleProtectedClick(e, "/ATSResume")}
                    className="hover:text-[#fb8500] dark:hover:text-[#fb8500] transition"
                  >
                    ATS
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-[#8ecae6] dark:bg-[#219ebc] hover:scale-110 transition"
            >
              {darkMode ? (
                <FaSun className="text-[#ffb703]" />
              ) : (
                <FaMoon className="text-[#023047]" />
              )}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => nav("/profile")}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#51aed9] dark:bg-[#04699b] text-[#023047] dark:text-[#e8f4fa] hover:bg-[#219ebc] dark:hover:bg-[#54c3fb] transition"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#ff4848] text-white rounded-md hover:bg-[#fd330b] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[#023047] dark:text-[#e8f4fa] hover:text-[#fb8500] dark:hover:text-[#fb8500] transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#ffb703] text-[#023047] rounded-md hover:bg-[#ffc637] transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-2xl p-8 w-full max-w-md relative shadow-2xl
                         bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                <FaTimes className="text-black dark:text-white" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Please login to continue
              </h2>
              <p className="text-black/70 dark:text-white/70 mb-6">
                You need to be logged in to use personalized features.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 rounded-xl font-medium 
                             bg-black/10 dark:bg-white/10 text-black dark:text-white
                             hover:bg-black/20 dark:hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="px-4 py-2 rounded-xl font-medium shadow-md
                             bg-gradient-to-r from-yellow-400 to-yellow-500 
                             text-black hover:from-yellow-500 hover:to-yellow-600 transition"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
