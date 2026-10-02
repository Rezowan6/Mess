import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";

import type { ApiResponse } from "@/shared/types/api.types";
import type {
  IMemberListResponse,
  IMemberParams,
  ITenantMember,
} from "../types/userManagement.types";

export const userManagementApi = {
  inviteMember: async (payload: { email: string; role: string }) => {
    const { data } = await API.post(
      API_ENDPOINTS.TENANT_MEMBERSHIP.INVITES,
      payload,
    );

    return data;
  },
  getMembers: async (params: IMemberParams): Promise<IMemberListResponse> => {
    const { data } = await API.get<IMemberListResponse>(
      API_ENDPOINTS.TENANT_MEMBERSHIP.LIST,
      { params },
    );

    return data;
  },

  getAllMembers: async (
    search?: string,
  ): Promise<ApiResponse<ITenantMember[]>> => {
    const { data } = await API.get<ApiResponse<ITenantMember[]>>(
      API_ENDPOINTS.TENANT_MEMBERSHIP.ALL,
      {
        params: {
          search,
        },
      },
    );

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
