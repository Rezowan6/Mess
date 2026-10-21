import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { IKhalaBillListResponse } from "../types/khalaBill.types";

export const khalaBillApi = {
  getAll: async (): Promise<IKhalaBillListResponse> => {
    const { data } = await API.get<IKhalaBillListResponse>(
      API_ENDPOINTS.KHALA_BILL.GET_ALL,
    );

    return data;
  },

  getById: async (id: number): Promise<IKhalaBillListResponse> => {
    const { data } = await API.get<IKhalaBillListResponse>(
      API_ENDPOINTS.KHALA_BILL.GET_BY_ID(id),
    );

    return data;
  },
  
  create: async (payload: any) => {
    const { data } = await API.post(API_ENDPOINTS.KHALA_BILL.CREATE, payload);

    return data;
  },

  update: async (id: number, payload: any) => {
    const { data } = await API.patch(
      API_ENDPOINTS.KHALA_BILL.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.KHALA_BILL.DELETE(id));

    return data;
  },
};
