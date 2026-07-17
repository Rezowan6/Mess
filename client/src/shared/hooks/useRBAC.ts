import { useMemo } from "react";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import type { Permission } from "../constants/permissions";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions";

export const useRBAC = () => {
  const user = useAuthStore((state) => state.user);

  const currentTenant = useTenantStore((state) => state.currentTenant);

  const role = useMemo(() => {
    const membership = user?.tenantMemberships?.find(
      (item) => item.tenantId === currentTenant?.tenantId,
    );

    return membership?.role;
  }, [user, currentTenant]);

  const permissions = useMemo(() => {
    if (!role) return [];

    return ROLE_PERMISSIONS[role] ?? [];
  }, [role]);

  const can = (permission: Permission) => {
    if (permissions.includes("*")) {
      return true;
    }

    return permissions.includes(permission);
  };

  const canAny = (required: Permission[]) => {
    return required.some((permission) => can(permission));
  };

  const canAll = (required: Permission[]) => {
    return required.every((permission) => can(permission));
  };

  return {
    role,
    permissions,
    can,
    canAny,
    canAll,
  };
};
