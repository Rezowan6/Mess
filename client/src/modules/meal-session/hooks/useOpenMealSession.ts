import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";
import { mealSessionApi } from "../api/mealSession.api";

export const useOpenMealSession = () => {
  const queryClient = useQueryClient();

  const currenttenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: mealSessionApi.open,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSessions.all(currenttenant?.tenantId),
      });
    },
  });
};
