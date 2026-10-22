import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { currentBill } from "../query/currentBill.querykey";
import type { ICurrentBillListResponse } from "../types/currentBill.types";

export const useDeletedCurrentBills = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<ICurrentBillListResponse>({
    queryKey: currentBill.deleted({ tenantId }),
    queryFn: () => currentBillApi.getDeleted(),

    enabled: Boolean(tenantId),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });
};
