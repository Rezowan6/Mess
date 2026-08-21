import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type {
  ICreatePartyExpense,
  IPartyExpense,
} from "../types/partyExpense.types";

export const partyExpenseApi = {
  getAll: async (): Promise<ApiResponse<IPartyExpense[]>> => {
    const { data } = await API.get<ApiResponse<IPartyExpense[]>>(
      API_ENDPOINTS.PARTY_EXPENSE.LIST,
    );

    return data;
  },

  create: async (
    payload: ICreatePartyExpense,
  ): Promise<ApiResponse<IPartyExpense>> => {
    const { data } = await API.post<ApiResponse<IPartyExpense>>(
      API_ENDPOINTS.PARTY_EXPENSE.CREATE,
      payload,
    );

    return data;
  },
};
