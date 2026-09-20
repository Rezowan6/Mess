import { useQuery } from "@tanstack/react-query";

import { mealEntryApi } from "../api/mealEntry.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IMealEntryListResponse,
  IMealEntryQuery,
} from "../types/mealEntry.types";

export const useMembersMealSummary = (params?: IMealEntryQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery<IMealEntryListResponse>({
    queryKey: [
      ...queryKeys.mealEntries.membersMealSummary(tenantId, mealSessionId),
      params,
    ],

    queryFn: async () => await mealEntryApi.membersMealSummary(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
