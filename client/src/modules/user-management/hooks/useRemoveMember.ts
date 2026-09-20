import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { userManagementApi } from "../api/userManagement.api";

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => userManagementApi.removeMember(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.tenants.members(tenantId)],
      });
    },
  });
};
