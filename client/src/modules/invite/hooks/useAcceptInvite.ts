import { useMutation } from "@tanstack/react-query";

import { inviteApi } from "../api/invite.api";

export const useAcceptInvite = () => {
  return useMutation({
    mutationFn: (payload: {
      token: string;
      name: string;
      password: string;
    }) => {
      return inviteApi.acceptInvite(payload);
    },
  });
};
