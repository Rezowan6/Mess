import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  IKhalaBillCreateDto,
  IKhalaBillListResponse,
  IKhalaBillResponse,
  IKhalaBillUpdateDto,
} from "../types/khalaBill.types";

export const khalaBillApi = {
  getAll: async (): Promise<IKhalaBillListResponse> => {
    const { data } = await API.get<IKhalaBillListResponse>(
      API_ENDPOINTS.KHALA_BILL.GET_ALL,
    );

    return data;
  },


  getById: async (userId: number): Promise<IKhalaBillListResponse> => {
    const { data } = await API.get<IKhalaBillListResponse>(
      API_ENDPOINTS.KHALA_BILL.GET_BY_ID(userId),
    );

    return data;
  },

  create: async (payload: IKhalaBillCreateDto): Promise<IKhalaBillResponse> => {
    const { data } = await API.post<IKhalaBillResponse>(
      API_ENDPOINTS.KHALA_BILL.CREATE,
      payload,
    );

    return data;
  },

  update: async (
    id: number,
    payload: IKhalaBillUpdateDto,
  ): Promise<IKhalaBillResponse> => {
    const { data } = await API.patch<IKhalaBillResponse>(
      API_ENDPOINTS.KHALA_BILL.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number): Promise<IKhalaBillResponse> => {
    const { data } = await API.delete<IKhalaBillResponse>(
      API_ENDPOINTS.KHALA_BILL.DELETE(id),
    );

    return data;
  },
};
