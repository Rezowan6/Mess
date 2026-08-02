import { useQuery } from "@tanstack/react-query";

import { myProfileApi } from "../api/myProfile.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useMyProfile = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery({
    queryKey: queryKeys.myProfile.current(currentTenant?.tenantId),
    queryFn: myProfileApi.getMyProfile,
    enabled: !!currentTenant?.tenantId,
  });
};
