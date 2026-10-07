import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useEggTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewDetails: can(PERMISSIONS.EXPENSE_CREATE),
  };
};
