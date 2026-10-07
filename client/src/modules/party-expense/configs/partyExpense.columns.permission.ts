import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const usePartyExpenseTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewActions:
      can(PERMISSIONS.EXPENSE_UPDATE) || can(PERMISSIONS.EXPENSE_DELETE),
  };
};
