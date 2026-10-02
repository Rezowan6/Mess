import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      if (!res.data) {
        throw new Error("Login response data is undefined");
      }
      const { accessToken, user } = res.data;

      setAccessToken(accessToken);
      // inside onSuccess, after setAccessToken(accessToken)
      setUser(user);
      const hasTenant = (user?.tenantMemberships?.length ?? 0) > 0;

      setTimeout(() => {
        window.location.replace(hasTenant ? ROUTES.DASHBOARD : ROUTES.TENANT);
      }, 1000);
    },
  });
};
