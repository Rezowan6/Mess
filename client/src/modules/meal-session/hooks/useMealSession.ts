import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { mealSessionApi } from "../api/mealSession.api";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const useMealSession = () => {
    const currentTenant = useTenantStore((state) => state.currentTenant);


    return useQuery({
        queryKey: queryKeys.mealSessions.all(currentTenant?.tenantId),

        queryFn: mealSessionApi.getCurrent,
    })
}