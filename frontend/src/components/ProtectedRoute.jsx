import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRole,
}) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
