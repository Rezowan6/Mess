import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useExpenseTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewDetails: can(PERMISSIONS.EXPENSE_CREATE),
  };
};
