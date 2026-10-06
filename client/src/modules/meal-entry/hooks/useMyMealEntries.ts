import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IMyMealApiResponse } from "../types/mealEntry.types";

export const useMyMealEntries = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMyMealApiResponse>({
    queryKey: [...queryKeys.mealEntries.list(tenantId, mealSessionId)],

    queryFn: async () => await mealEntryApi.my(),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
