import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";
import { invalidateMealSessionQueries } from "../query/mealSession.invalidation";

export const useCloseMealSession = () => {
  const tenantId = useCurrentTenantId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mealSessionApi.close(id),

    onSuccess: () => {
      invalidateMealSessionQueries(queryClient, { tenantId });
    },
  });
};
