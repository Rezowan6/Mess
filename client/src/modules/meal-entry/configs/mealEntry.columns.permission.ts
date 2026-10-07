import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useMealEntryTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewDetails: can(PERMISSIONS.MEAL_ENTRY_CREATE),
  };
};
