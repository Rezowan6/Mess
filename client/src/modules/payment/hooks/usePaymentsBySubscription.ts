import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";

export const usePaymentsBySubscription = (subscriptionId: number) => {
  return useQuery({
    queryKey: queryKeys.payments.bySubscriptionId(subscriptionId),
    queryFn: () => paymentApi.getBySubscriptionId(subscriptionId),
    enabled: !!subscriptionId,
  });
};