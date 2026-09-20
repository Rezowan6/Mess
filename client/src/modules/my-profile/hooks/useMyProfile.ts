import { useQuery } from "@tanstack/react-query";

import { myProfileApi } from "../api/myProfile.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useMyProfile = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.myProfile.current(tenantId, mealSessionId),
    queryFn: myProfileApi.getMyProfile,
    
    enabled: !!tenantId,
  });
};
