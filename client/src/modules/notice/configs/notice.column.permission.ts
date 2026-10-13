import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

export const useNoticeTablePermissions = () => {
  const { can } = useRBAC();

  return {
    canViewAction: can(PERMISSIONS.NOTICE_CREATE),
  };
};
