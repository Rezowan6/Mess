import type { ReactNode } from "react";

import { useRBAC } from "@/shared/hooks/useRBAC";

import type { Permission } from "@/shared/constants/permissions";

interface Props {
  permission: Permission;
  children: ReactNode;
}

export const PermissionGate = ({ permission, children }: Props) => {
  const { can } = useRBAC();

  if (!can(permission)) {
    return null;
  }

  return <>{children}</>;
};
