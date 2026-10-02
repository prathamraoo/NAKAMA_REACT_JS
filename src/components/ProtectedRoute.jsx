import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("nakamasAdmin");

  if (isAdmin !== "true") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;