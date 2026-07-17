import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";

import type { Role } from "../constants/roles";

interface Props {
  allowedRoles: Role[];
}

export const RoleGuard = ({ allowedRoles }: Props) => {
  const user = useAuthStore((state) => state.user);

  const role = user?.tenantMemberships?.[0]?.role as Role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
