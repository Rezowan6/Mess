import { useMutation } from "@tanstack/react-query";
import tost from "react-hot-toast";

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

      tost.success(res.message);

      window.location.replace(ROUTES.DASHBOARD);
    },

    onError: (err) => {
      tost.error(err.message ?? "Something went wrong, Login failed.");
    },
  });
};
