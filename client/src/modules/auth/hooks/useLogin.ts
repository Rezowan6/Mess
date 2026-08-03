import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";
import { ROUTES } from "@/shared/constants/routes";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {

      if (!res.data) {
        throw new Error("Login response data is undefined");
      }
      const { accessToken } = res.data;

      setAccessToken(accessToken);

      setTimeout(() => {
        window.location.replace(ROUTES.DASHBOARD);
      }, 1000);
    },
  });
};
