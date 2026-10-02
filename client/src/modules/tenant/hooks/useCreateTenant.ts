import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { tenantApi } from "../api/tenant.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { ROUTES } from "@/shared/constants/routes";

export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: tenantApi.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.all,
      });

      setTimeout(() => {
        navigate(`${ROUTES.USERS}`, { replace: true });
      }, 1000);
    },
  });
};
