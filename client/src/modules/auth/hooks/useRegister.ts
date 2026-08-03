import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      console.log("register")
      // setTimeout(() => {
      //   window.location.replace(ROUTES.LOGIN);
      // }, 1000);
    },
  });
};
