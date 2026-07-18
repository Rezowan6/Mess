import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      const { accessToken } = res.data;

      setAccessToken(accessToken);

      setTimeout(() => {
        window.location.replace(ROUTES.DASHBOARD);
      }, 1000);
    },
  });
};
