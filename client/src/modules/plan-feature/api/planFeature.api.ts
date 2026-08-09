import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { IPlanFeature } from "../types/planFeature.types";

export const planFeatureApi = {
  getAll: async (): Promise<ApiResponse<IPlanFeature[]>> => {
    const { data } = await API.get<ApiResponse<IPlanFeature[]>>(
      API_ENDPOINTS.PLAN_FEATURE.LIST,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<IPlanFeature>> => {
    const { data } = await API.get<ApiResponse<IPlanFeature>>(
      API_ENDPOINTS.PLAN_FEATURE.BY_ID(id),
    );

    return data;
  },

  getByPlanId: async (planId: number): Promise<ApiResponse<IPlanFeature[]>> => {
    const { data } = await API.get<ApiResponse<IPlanFeature[]>>(
      API_ENDPOINTS.PLAN_FEATURE.BY_PLAN_ID(planId),
    );

    return data;
  },

  create: async (payload: Partial<IPlanFeature>): Promise<ApiResponse> => {
    const { data } = await API.post<ApiResponse>(
      API_ENDPOINTS.PLAN_FEATURE.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    id: number,
    payload: Partial<IPlanFeature>,
  ): Promise<ApiResponse> => {
    const { data } = await API.patch<ApiResponse>(
      API_ENDPOINTS.PLAN_FEATURE.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const { data } = await API.delete<ApiResponse>(
      API_ENDPOINTS.PLAN_FEATURE.DELETE(id),
    );

    return data;
  },
};
