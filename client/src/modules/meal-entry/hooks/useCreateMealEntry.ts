import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateMealEntriesQueries } from "../query/mealEntry.invalidation";

export const useCreateMealEntry = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: mealEntryApi.create,

    onSuccess: () => {
      invalidateMealEntriesQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};