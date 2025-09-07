import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

export default function AdminLayout() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const logout = () => {
    localStorage.removeItem("userInfo");
    nav("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-600">Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaCalendarAlt /> Events
          </NavLink>
        </nav>
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
