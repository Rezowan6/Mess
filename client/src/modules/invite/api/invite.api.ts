import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

export const inviteApi = {
  acceptInvite: async (payload: {
    token: string;
    name: string;
    password: string;
  }) => {
    const { data } = await API.post(`${API_ENDPOINTS.INVITE.ACCEPT}/${payload.token}`, payload);

    return data;
  },
};
