import { useQuery } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { khalaBill } from "../query/khalaBill.querykey";

export const useKhalaBill = (id: number) => {
  const tenantId = useCurrentTenantId();

  return useQuery<any>({
    queryKey: khalaBill.getById({ tenantId }),

    queryFn: () => khalaBillApi.getById(id),

    enabled: Boolean(tenantId),

    placeholderData: (previous: any) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
