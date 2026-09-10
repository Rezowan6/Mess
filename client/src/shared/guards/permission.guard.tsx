import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { ReactNode } from "react";
import { PageLoader } from "../components/feedback/PageLoader";
import type { Permission } from "../constants/permissions";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useRBAC } from "../hooks/useRBAC";

interface Props {
  permission: Permission;
  children?: ReactNode;
}

export const PermissionGuard = ({ permission, children }: Props) => {
  const { isOffline } = useOnlineStatus();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.isInitialized);

  const { can } = useRBAC();

  // Auth loading state
  if (!user) {
    return <PageLoader />;
  }

  if (!initialized) {
    return <PageLoader />;
  }

  if (!can(permission)) {
    if (isOffline) {
      return <PageLoader />;
    }

    return <Navigate to="/403" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
