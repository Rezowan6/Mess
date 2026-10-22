import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { khalaBill } from "../query/khalaBill.querykey";

export const useKhalaBill = (userId: number) => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: khalaBill.getById({ tenantId, userId }),
    queryFn: () => khalaBillApi.getById(userId),
    enabled: Number.isInteger(userId) && userId > 0 && Boolean(tenantId),
    staleTime: 1000 * 60,
  });
};
