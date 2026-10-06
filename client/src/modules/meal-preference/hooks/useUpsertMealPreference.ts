import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealPreferenceApi } from "../api/mealPreference.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateMealPreferenceQueries } from "../query/mealPreference.invalidation";
import type { IUpsertMealPreferenceDto } from "../types/mealPreference.types";

export const useUpsertMealPreference = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (payload: IUpsertMealPreferenceDto) =>
      mealPreferenceApi.upsert(payload),

    onSuccess: () => {
      invalidateMealPreferenceQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
