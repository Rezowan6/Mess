import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { khalaBill } from "../query/khalaBill.querykey";

export const useKhalaBills = () => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: khalaBill.list({ tenantId }),
    queryFn: khalaBillApi.getAll,
    enabled: Boolean(tenantId),
    staleTime: 1000 * 60 * 5,
  });
};
