import { useQuery } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type {
  IDepositListResponse,
  IDepositQuery,
} from "../types/deposit.types";

export const useMemberDepositSummary = (params?: IDepositQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  const baseKey = queryKeys.deposits.list(tenantId, mealSessionId);

  return useQuery<IDepositListResponse>({
    queryKey: [...baseKey, params],

    queryFn: async () => await depositApi.memberDepositSummary(params),

    enabled: Boolean(tenantId && mealSessionId),

    // Keep previous data only for search/page changes within the same tenant + session
    placeholderData: (previousData, previousQuery) => {
      const previousBaseKey = previousQuery?.queryKey.slice(0, -1);

      return JSON.stringify(previousBaseKey) === JSON.stringify(baseKey)
        ? previousData
        : undefined;
    },

    staleTime: 1000 * 60 * 5,
  });
};
