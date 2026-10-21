import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ICurrentBillListResponse } from "../types/currentBill.types";

export const currentBillApi = {
      getAll: async (): Promise<ICurrentBillListResponse> => {
        const { data } = await API.get<ICurrentBillListResponse>(
          API_ENDPOINTS.CURRENT_BILL.GET_ALL,
        );
    
        return data;
      },
    
      getById: async (id: number): Promise<ICurrentBillListResponse> => {
        const { data } = await API.get<ICurrentBillListResponse>(
          API_ENDPOINTS.CURRENT_BILL.GET_BY_ID(id),
        );
    
        return data;
      },
      
      create: async (payload: any) => {
        const { data } = await API.post(API_ENDPOINTS.CURRENT_BILL.CREATE, payload);
    
        return data;
      },
    
      update: async (id: number, payload: any) => {
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
}