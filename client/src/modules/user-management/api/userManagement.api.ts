import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";

import type { IMemberListResponse } from "../types/userManagement.types";

export const userManagementApi = {
  inviteMember: async (payload: { email: string; role: string }) => {
    const { data } = await API.post(
      API_ENDPOINTS.TENANT_MEMBERSHIP.INVITES,
      payload,
    );

    return data;
  },
  getMembers: async (): Promise<IMemberListResponse> => {
    const { data } = await API.get<IMemberListResponse>(API_ENDPOINTS.TENANT_MEMBERSHIP.LIST);

    return data;
  },

  updateRole: async (id: number, role: string) => {
    const { data } = await API.patch(
      API_ENDPOINTS.TENANT_MEMBERSHIP.UPDATE_ROLE(id),
      { role },
    );

    return data;
  },

  removeMember: async (id: number) => {
    const { data } = await API.delete(
      API_ENDPOINTS.TENANT_MEMBERSHIP.REMOVE(id),
    );

    return data;
  },
};
