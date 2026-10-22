import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type { IPaginationParams } from "@/shared/types/pagination.types";
import type {
  ICurrentBillCreateDto,
  ICurrentBillListResponse,
} from "../types/currentBill.types";

export const currentBillApi = {
  getAll: async (
    params: IPaginationParams,
  ): Promise<ICurrentBillListResponse> => {
    const { data } = await API.get<ICurrentBillListResponse>(
      API_ENDPOINTS.CURRENT_BILL.GET_ALL,
      { params },
    );

    return data;
  },

  getById: async (id: number): Promise<ICurrentBillListResponse> => {
    const { data } = await API.get<ICurrentBillListResponse>(
      API_ENDPOINTS.CURRENT_BILL.GET_BY_ID(id),
    );

    return data;
  },

  getDeleted: async (): Promise<ICurrentBillListResponse> => {
    const { data } = await API.get<ICurrentBillListResponse>(
      API_ENDPOINTS.CURRENT_BILL.GET_DELETED,
    );

    return data;
  },

  create: async (payload: ICurrentBillCreateDto) => {
    const { data } = await API.post(API_ENDPOINTS.CURRENT_BILL.CREATE, payload);

    return data;
  },

  update: async (id: number, payload: ICurrentBillCreateDto) => {
    const { data } = await API.patch(
      API_ENDPOINTS.CURRENT_BILL.UPDATE(id),
      payload,
    );

    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.CURRENT_BILL.DELETE(id));

    return data;
  },

  restore: async (id: number) => {
    const { data } = await API.patch(API_ENDPOINTS.CURRENT_BILL.RESTORE(id));

    return data;
  },
};
