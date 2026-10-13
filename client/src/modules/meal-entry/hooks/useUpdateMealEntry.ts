import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateMealEntriesQueries } from "../query/mealEntry.invalidation";
import type { IUpdateMealEntryDto } from "../types/mealEntry.types";

export const useUpdateMealEntry = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: IUpdateMealEntryDto;
    }) => mealEntryApi.update(id, payload),

    onSuccess: () => {
      invalidateMealEntriesQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};