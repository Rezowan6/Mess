import { API } from "@/shared/lib/axios"; 

import type { ApiResponse } from "@/shared/types/api.types"; 
import { API_ENDPOINTS } from "@/shared/constants/api";

import type { IMonthlyCalculation } from "../types/monthlyCalculation.types";

export const monthlyCalculationApi = {
  getCurrent: async () => {
    const { data } = await API.get<ApiResponse<IMonthlyCalculation>>(
      API_ENDPOINTS.MONTHLY_CALCULATION.CURRENT,
    );

    return data;
  },
};
