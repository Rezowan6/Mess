import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementApi } from "../api/userManagement.api";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      userManagementApi.updateRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.tenantMembers(currentTenant?.tenantId)],
      });
    },
  });
};
