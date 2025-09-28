import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import Chatbot from "./components/Chatbot";
import EventRecommendations from "./pages/EventRecommendations";
import ATSResume from "./pages/ATSResume";
import Hackinator from "./pages/Hackinator";

// ✅ Protected wrapper
const Protected = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  if (!userInfo?.token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ATSResume" element={<ATSResume />} />
          <Route path="/Hackinator" element={<Hackinator />} />
          <Route path="/EventRecommendations" element={<EventRecommendations />} />

          {/* User profile (protected) */}
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <Protected adminOnly>
                <AdminLayout />
              </Protected>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>
        </Routes>
      </main>

      <Footer />

      {/* 👇 Chatbot is global */}
      <Chatbot />

      {/* 👇 React Hot Toast (must be inside App) */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
