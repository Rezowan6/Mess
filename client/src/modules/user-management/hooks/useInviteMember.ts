import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementApi } from "../api/userManagement.api";
import { queryKeys } from '@/shared/constants/queryKeys';
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  const currenttenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: userManagementApi.inviteMember,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.invites(currenttenant?.tenantId),
      });
    },
  });
};
