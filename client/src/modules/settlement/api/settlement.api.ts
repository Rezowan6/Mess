import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";

import type {
  ICreateSettlementDto,
  ISettlement,
  IUpdateSettlementDto,
} from "../types/settlement.types";

export const settlementApi = {
  getAll: async (): Promise<ApiResponse<ISettlement[]>> => {
    const { data } = await API.get<ApiResponse<ISettlement[]>>(
      API_ENDPOINTS.SETTLEMENT.LIST,
    );

    return data;
  },

  getById: async (id: number): Promise<ApiResponse<ISettlement>> => {
    const { data } = await API.get<ApiResponse<ISettlement>>(
      API_ENDPOINTS.SETTLEMENT.BY_ID(id),
    );

    return data;
  },

  create: async (
    payload: ICreateSettlementDto,
  ): Promise<ApiResponse<ISettlement>> => {
    const { data } = await API.post<ApiResponse<ISettlement>>(
      API_ENDPOINTS.SETTLEMENT.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    id: number,
    payload: IUpdateSettlementDto,
  ): Promise<ApiResponse<ISettlement>> => {
    const { data } = await API.patch<ApiResponse<ISettlement>>(
      API_ENDPOINTS.SETTLEMENT.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const { data } = await API.delete<ApiResponse<null>>(
      API_ENDPOINTS.SETTLEMENT.DELETE(id),
    );

    return data;
  },
};
