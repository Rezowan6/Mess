import { Navigate, Outlet } from "react-router-dom";

import { tokenStorage } from "@/shared/utils/token";

export const ProtectedRoute = () => {
  const token = tokenStorage.get();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
