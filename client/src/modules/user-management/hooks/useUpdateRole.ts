import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";
import { userManagementApi } from "../api/userManagement.api";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      userManagementApi.updateRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.tenants.members(currentTenant?.tenantId)],
      });
    },
  });
};
