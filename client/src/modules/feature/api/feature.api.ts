import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { IFeature } from "../types/feature.types";

export const featureApi = {
  getAll: async (): Promise<ApiResponse<IFeature[]>> => {
    const { data } = await API.get<ApiResponse<IFeature[]>>(
      API_ENDPOINTS.FEATURE.LIST,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<IFeature>> => {
    const { data } = await API.get<ApiResponse<IFeature>>(
      API_ENDPOINTS.FEATURE.BY_ID(id),
    );

    return data;
  },

  create: async (payload: Partial<IFeature>): Promise<ApiResponse> => {
    const { data } = await API.post<ApiResponse>(
      API_ENDPOINTS.FEATURE.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    id: number,
    payload: Partial<IFeature>,
  ): Promise<ApiResponse> => {
    const { data } = await API.patch<ApiResponse>(
      API_ENDPOINTS.FEATURE.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const { data } = await API.delete<ApiResponse>(
      API_ENDPOINTS.FEATURE.DELETE(id),
    );

    return data;
  },
};
