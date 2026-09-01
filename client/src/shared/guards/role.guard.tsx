import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { ROLES, type Role } from "../constants/roles";

interface Props {
  allowedRoles: Role[];
}

export const RoleGuard = ({ allowedRoles }: Props) => {
  const user = useAuthStore((state) => state.user);

  const currentTenant = useTenantStore((state) => state.currentTenant);

  const membership = user?.tenantMemberships?.find(
    (item) => item.tenantId === currentTenant?.tenantId,
  );

  const role = user?.role === ROLES.SYSTEM_OWNER ? user.role : membership?.role;

  if (!role || !allowedRoles.includes(role)) {

    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
