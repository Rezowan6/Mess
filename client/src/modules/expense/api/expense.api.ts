import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

import type {
  ICreateExpenseDto,
  IExpenseListResponse,
  IExpenseQuery,
  IUpdateExpenseDto,
} from "../types/expense.types";

export const expenseApi = {
  getAll: async (params?: IExpenseQuery): Promise<IExpenseListResponse> => {
    const { data } = await API.get<IExpenseListResponse>(
      API_ENDPOINTS.EXPENSE.GET_ALL,
      {
        params,
      },
    );

    return data;
  },

  getById: async (id: number) => {
    const res = await API.get(API_ENDPOINTS.EXPENSE.GET_BY_ID(id));
    return res.data;
  },

  create: async (payload: ICreateExpenseDto) => {
    const res = await API.post(API_ENDPOINTS.EXPENSE.CREATE, payload);
    return res.data;
  },

  update: async (id: number, payload: IUpdateExpenseDto) => {
    const res = await API.patch(API_ENDPOINTS.EXPENSE.UPDATE(id), payload);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await API.delete(API_ENDPOINTS.EXPENSE.DELETE(id));
    return res.data;
  },

  summary: async () => {
    const res = await API.get(API_ENDPOINTS.EXPENSE.SUMMARY);
    return res.data;
  },
};
