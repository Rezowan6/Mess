import { queryKeys } from "@/shared/constants/queryKeys";
import type { QueryClient } from "@tanstack/react-query";

export const invalidatePaymentMethodQueries = (
  queryClient: QueryClient,
  { tenantId }: { tenantId?: number; mealSessionId?: number },
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.paymentMethods.all(tenantId),
  });
};
