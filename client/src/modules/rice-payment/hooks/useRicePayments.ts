import { useQuery } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useRicePayments = (riceId: number) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.ricePayments.get({tenantId, mealSessionId}, riceId),
    queryFn: () => ricePaymentApi.getAll(riceId),
    enabled: Boolean(tenantId && mealSessionId && riceId),
    staleTime: 1000 * 60 * 5,
  });
};
