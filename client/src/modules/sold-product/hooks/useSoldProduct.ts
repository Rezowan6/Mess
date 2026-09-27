import { useQuery } from "@tanstack/react-query";

import { soldProductApi } from "../api/soldProduct.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useSoldProduct = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.soldProducts.get(tenantId, mealSessionId),
    queryFn: soldProductApi.get,
    enabled: Boolean(tenantId && mealSessionId),

    staleTime: 1000 * 60 * 5,
  });
};