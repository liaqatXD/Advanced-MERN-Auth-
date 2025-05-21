import { useContext } from "react";
import { authContext } from "../context/authContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useContext(authContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
