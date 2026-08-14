import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const usePaymentsBySubscription = (subscriptionId: number) => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.payments.bySubscriptionId(tenantId,subscriptionId),
    queryFn: () => paymentApi.getBySubscriptionId(subscriptionId),
    enabled: !!subscriptionId,
  });
};