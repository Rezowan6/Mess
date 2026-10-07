import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useMemberTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewActions: can(PERMISSIONS.USER_DELETE),
  };
};
