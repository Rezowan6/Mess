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

  return useQuery<IDepositListResponse>({
    queryKey: [...queryKeys.deposits.list(tenantId, mealSessionId), params],

    queryFn: async () => await depositApi.memberDepositSummary(params),

    enabled: !!tenantId,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
