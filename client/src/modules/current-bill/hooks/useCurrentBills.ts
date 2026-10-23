import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import type { IPaginationParams } from "@/shared/types/pagination.types";

import { currentBillApi } from "../api/current-bill.api";
import { currentBill } from "../query/currentBill.querykey";
import type { ICurrentBillListResponse } from "../types/currentBill.types";

export const useCurrentBills = (params: IPaginationParams) => {
  const tenantId = useCurrentTenantId();

  const normalizedParams: IPaginationParams = {
    page: params.page,
    limit: params.limit,
    search: params.search?.trim() ?? "",
  };

  return useQuery<ICurrentBillListResponse>({
    queryKey: currentBill.list({
      tenantId,
      ...normalizedParams,
    }),

    queryFn: () => currentBillApi.getAll(normalizedParams),

    enabled: Boolean(tenantId),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};
