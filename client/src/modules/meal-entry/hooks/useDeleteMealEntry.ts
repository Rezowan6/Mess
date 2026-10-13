import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { mealEntryApi } from "../api/mealEntry.api";
import { invalidateMealEntriesQueries } from "../query/mealEntry.invalidation";

export const useDeleteMealEntry = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (id: number) => mealEntryApi.delete(id),

    onSuccess: () => {
      invalidateMealEntriesQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};