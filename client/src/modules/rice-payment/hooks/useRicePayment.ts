import { useQuery } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useRicePayment = (riceId: number, id: number) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.ricePayments.byId(tenantId, mealSessionId, riceId, id),
    queryFn: () => ricePaymentApi.getById(riceId, id),
    enabled: Boolean(tenantId && mealSessionId && riceId && id),
    staleTime: 1000 * 60 * 5,
  });
};
