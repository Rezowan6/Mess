import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";
import { userManagementApi } from "../api/userManagement.api";

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: (id: number) => userManagementApi.removeMember(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.tenantMembers(currentTenant?.tenantId)],
      });
    },
  });
};
