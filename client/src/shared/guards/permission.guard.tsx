import { Navigate, Outlet } from "react-router-dom";

import type { Permission } from "../constants/permissions";
import { useRBAC } from "../hooks/useRBAC";

interface Props {
  permission: Permission;
}

export const PermissionGuard = ({ permission }: Props) => {
  const { can } = useRBAC();

  if (!can(permission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
