import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { paymentMethodApi } from "../api/paymentMethod.api";

export const usePaymentMethods = () => {
  const { tenantId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.paymentMethods.all(tenantId),
    queryFn: paymentMethodApi.getAll,
    enabled: Boolean(tenantId),
  });
};
