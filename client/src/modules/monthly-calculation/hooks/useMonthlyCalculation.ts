import { useQuery } from "@tanstack/react-query";

import { monthlyCalculationApi } from "../api/monthlyCalculation.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useMonthlyCalculation = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.monthlyCalculations.current(tenantId, mealSessionId),
    queryFn: monthlyCalculationApi.getCurrent,

    enabled: Boolean(tenantId && mealSessionId),
  });
};
