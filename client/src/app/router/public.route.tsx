import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";
import { tokenStorage } from "@/shared/utils/token";

export const PublicRoute = () => {
  const token = tokenStorage.get();

  if (token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
