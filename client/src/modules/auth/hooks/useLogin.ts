import { useMutation } from "@tanstack/react-query";
import tost from "react-hot-toast";

import { authApi } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      const { accessToken, user } = res.data;

      setAccessToken(accessToken);

      setUser(user);

      tost.success(res.message);
    },

    onError: (err) => {
      tost.error(err.message ?? "Something went wrong, Login failed.");
    },
  });
};
