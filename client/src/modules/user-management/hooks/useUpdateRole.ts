import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { userManagementApi } from "../api/userManagement.api";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      userManagementApi.updateRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.members(tenantId),
      });
    },
  });
};
