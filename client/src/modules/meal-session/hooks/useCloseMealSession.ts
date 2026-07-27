import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";
import { mealSessionApi } from "../api/mealSession.api";

export const useCloseMealSession = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mealSessionApi.close(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSessions.all(currentTenant?.tenantId),
      });
    },
  });
};
