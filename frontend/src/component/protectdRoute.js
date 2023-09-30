import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ Component, ...rest }) => {
  // authentication logic
  const isAuthenticated = Cookies.get("userToken");

  return isAuthenticated ? (
    <Component {...rest} /> // Render the Component directly
  ) : (
    <Navigate to="/" /> // Redirect to Rules page if not authenticated
  );
};

export default ProtectedRoute;
