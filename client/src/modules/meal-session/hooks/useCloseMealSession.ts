import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";

export const useCloseMealSession = () => {
  const tenantId = useCurrentTenantId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mealSessionApi.close(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealSessions.all(tenantId),
      });
    },
  });
};
