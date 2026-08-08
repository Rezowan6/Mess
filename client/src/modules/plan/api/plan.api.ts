import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { IPlan } from "../types/plan.types";

export const planApi = {
  getAll: async (): Promise<ApiResponse<IPlan[]>> => {
    const { data } = await API.get<ApiResponse<IPlan[]>>(
      API_ENDPOINTS.PLAN.LIST,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<IPlan>> => {
    const { data } = await API.get<ApiResponse<IPlan>>(
      API_ENDPOINTS.PLAN.BY_ID(id),
    );

    return data;
  },

  create: async (payload: Partial<IPlan>): Promise<ApiResponse<IPlan>> => {
    const { data } = await API.post<ApiResponse<IPlan>>(
      API_ENDPOINTS.PLAN.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    id: number,
    payload: Partial<IPlan>,
  ): Promise<ApiResponse<IPlan>> => {
    const { data } = await API.patch<ApiResponse<IPlan>>(
      API_ENDPOINTS.PLAN.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const { data } = await API.delete<ApiResponse>(
      API_ENDPOINTS.PLAN.DELETE(id),
    );

    return data;
  },
};
