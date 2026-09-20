import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IMealEntryListResponse,
  IMealEntryQuery,
} from "../types/mealEntry.types";

export const useMyMealEntries = (params?: IMealEntryQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMealEntryListResponse>({
    queryKey: [...queryKeys.mealEntries.list(tenantId, mealSessionId), params],

    queryFn: async () => await mealEntryApi.my(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
