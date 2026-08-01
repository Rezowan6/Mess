import { useQuery } from "@tanstack/react-query";

import { monthlyCalculationApi } from "../api/monthlyCalculation.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useMonthlyCalculation = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery({
    queryKey: queryKeys.monthlyCalculations.current(currentTenant?.tenantId),
    queryFn: monthlyCalculationApi.getCurrent,
    enabled: !!currentTenant?.tenantId,
  });
};
