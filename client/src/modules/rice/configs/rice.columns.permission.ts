import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useRiceTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canManage: can(PERMISSIONS.EXPENSE_CREATE),
  };
};
