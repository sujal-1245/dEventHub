import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children, adminOnly = false }) => {
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return children;
};

export default Protected;
