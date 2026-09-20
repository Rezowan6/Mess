import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { mealPreferenceApi } from "../api/mealPreference.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IUpsertMealPreferenceDto } from "../types/mealPreference.types";

export const useUpsertMealPreference = () => {
  const queryClient = useQueryClient();
  
    const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (payload: IUpsertMealPreferenceDto) =>
      mealPreferenceApi.upsert(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.list(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.mealRequests.myRequests(tenantId, mealSessionId),
      });
    },
  });
};
