import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";
import { tokenStorage } from "@/shared/utils/token";

export const ProtectedRoute = () => {
  const token = tokenStorage.get();

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
