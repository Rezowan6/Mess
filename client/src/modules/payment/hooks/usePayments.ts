import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const usePayments = () => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.payments.list(tenantId),
    queryFn: paymentApi.getAll,
  });
};