import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

import { currentBillApi } from "../api/current-bill.api";
import { currentBill } from "../query/currentBill.querykey";

export const useCurrentBill = (id: number) => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: currentBill.getById({ tenantId, id }),
    queryFn: () => currentBillApi.getById(id),

    enabled: Number.isInteger(id) && id > 0 && Boolean(tenantId),
    staleTime: 1000 * 60,
  });
};
