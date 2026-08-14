import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const usePayment = (id: number) => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.payments.byId(tenantId,id),
    queryFn: () => paymentApi.getById(id),
    enabled: !!id,
  });
};