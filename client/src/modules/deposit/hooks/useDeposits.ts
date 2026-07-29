import { useQuery } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import type {
  IDepositListResponse,
  IDepositQuery,
} from "../types/deposit.types";

export const useDeposits = (params?: IDepositQuery) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IDepositListResponse>({
    queryKey: [...queryKeys.deposits.list(currentTenant?.tenantId), params],

    queryFn: async () => await depositApi.getAll(params),

    enabled: !!currentTenant,

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
