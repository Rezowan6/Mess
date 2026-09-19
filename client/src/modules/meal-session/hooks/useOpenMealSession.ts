import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";

export const useOpenMealSession = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: mealSessionApi.open,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSessions.all(tenantId),
      });
    },
  });
};
