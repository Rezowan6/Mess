import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { mealSessionApi } from "../api/mealSession.api";
import { invalidateMealSessionQueries } from "../query/mealSession.invalidation";

export const useOpenMealSession = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: mealSessionApi.open,

    onSuccess: () => {
      invalidateMealSessionQueries(queryClient, { tenantId, });
    },
  });
};
