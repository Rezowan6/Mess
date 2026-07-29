import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreateDepositDto,
  IDepositListResponse,
  IDepositQuery,
  IUpdateDepositDto,
} from "../types/deposit.types";

export const depositApi = {
  getAll: async (params?: IDepositQuery): Promise<IDepositListResponse> => {
    const { data } = await API.get<IDepositListResponse>(
      API_ENDPOINTS.DEPOSIT.GET_ALL,
      {
        params,
      },
    );

    return data;
  },

  summary: async (params?: IDepositQuery): Promise<IDepositListResponse> => {
    const { data } = await API.get<IDepositListResponse>(
      API_ENDPOINTS.DEPOSIT.SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  memberDepositSummary: async (
    params?: IDepositQuery,
  ): Promise<IDepositListResponse> => {
    const { data } = await API.get<IDepositListResponse>(
      API_ENDPOINTS.DEPOSIT.MEMBER_DEPOSIT_SUMMARY,
      {
        params,
      },
    );

    return data;
  },

  create: async (payload: ICreateDepositDto) => {
    const { data } = await API.post(API_ENDPOINTS.DEPOSIT.CREATE, payload);

    return data;
  },

  update: async (id: number, payload: IUpdateDepositDto) => {
    const { data } = await API.patch(API_ENDPOINTS.DEPOSIT.UPDATE(id), payload);

    return data;
  },

  delete: async (id: number) => {
    const { data } = await API.delete(API_ENDPOINTS.DEPOSIT.DELETE(id));

    return data;
  },
};
