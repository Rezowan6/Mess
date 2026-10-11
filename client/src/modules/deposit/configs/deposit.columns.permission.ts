import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useDepositTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewDetails: can(PERMISSIONS.DEPOSIT_CREATE),
  };
};
