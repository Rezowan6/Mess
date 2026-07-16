import { Navigate, Outlet } from "react-router-dom";

import { tokenStorage } from "@/shared/utils/token";

export const PublicRoute = () => {
  const token = tokenStorage.get();

  if (token) {
    return <Navigate to="/dashboard" replace />;
    
  }

  return <Outlet />;
};
