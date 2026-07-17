import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { queryKeys } from "@/shared/constants/queryKeys";
import { forceLogout } from "@/shared/utils/forceLogout";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

interface UseMeOptions {
  enabled?: boolean;
}

export const useMe = (options?: UseMeOptions) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setTenant = useTenantStore((state) => state.setTenant);

  const query = useQuery({
    queryKey: queryKeys.authMe,

    queryFn: authApi.getMe,

    retry: false,

    enabled: options?.enabled,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);

      if (query.data?.tenantMemberships?.length > 0) {
        const memberShip = query.data?.tenantMemberships[0];

        setTenant({
          tenantId: memberShip.tenantId,
          role: memberShip.role,
          tenant: memberShip.tenant,
          status: memberShip.status,
        });
      }
    }

    if (query.isError) {
      forceLogout();
    }
  }, [query.data, query.isError, setUser, setTenant]);

  return query;
};
