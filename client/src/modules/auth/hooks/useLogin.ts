import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      console.log("LOGIN RESPONSE:", res);
      console.log("LOGIN DATA:", res.data);

      if (!res.data) {
        throw new Error("Login response data is undefined");
      }
      const { accessToken } = res.data;

      setAccessToken(accessToken);

      // setTimeout(() => {
      //   window.location.replace(ROUTES.DASHBOARD);
      // }, 1000);
    },
  });
};
