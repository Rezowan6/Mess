import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { currentBill } from "../query/currentBill.querykey";

export const useCurrentBills = () => {
  const tenantId = useCurrentTenantId();

  return useQuery<any>({
    queryKey: currentBill.list({ tenantId }),

    queryFn: currentBillApi.getAll,

    enabled: Boolean(tenantId),

    placeholderData: (previous: any) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
