import { useContext } from "react";
import { authContext } from "../context/authContext";
import { Outlet, Navigate } from "react-router-dom";
const PublicOnlyRoute = () => {
  const { isAuthenticated, user } = useContext(authContext);
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PublicOnlyRoute;
