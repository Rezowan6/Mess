import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { IPaginationParams } from "@/shared/types/pagination.types";
import type {
  ICreateRice,
  IRice,
  IRiceListResponse,
  IUpdateRice,
} from "../types/rice.types";

export const riceApi = {
  getAll: async (params?: IPaginationParams): Promise<IRiceListResponse> => {
    const { data } = await API.get<IRiceListResponse>(API_ENDPOINTS.RICE.LIST, {
      params,
    });

    return data;
  },

  getSummary: async (): Promise<ApiResponse<IRice[]>> => {
    const { data } = await API.get<ApiResponse<IRice[]>>(
      API_ENDPOINTS.RICE.SUMMARY,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<IRice>> => {
    const { data } = await API.get<ApiResponse<IRice>>(
      API_ENDPOINTS.RICE.BY_ID(id),
    );

    return data;
  },

  getRemainingDue: async (id: number): Promise<ApiResponse<number>> => {
    const { data } = await API.get<ApiResponse<number>>(
      API_ENDPOINTS.RICE.DUE(id),
    );

    return data;
  },

  create: async (payload: ICreateRice): Promise<ApiResponse> => {
    const { data } = await API.post<ApiResponse>(
      API_ENDPOINTS.RICE.CREATE,
      payload,
    );

    return data;
  },

  update: async (id: number, payload: IUpdateRice): Promise<ApiResponse> => {
    const { data } = await API.patch<ApiResponse>(
      API_ENDPOINTS.RICE.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const { data } = await API.delete<ApiResponse>(
      API_ENDPOINTS.RICE.DELETE(id),
    );

    return data;
  },
};
