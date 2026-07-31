import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ITenantFormData } from "../schemas/tenant.schema";

export const tenantApi = {
  create: async (payload: ITenantFormData) => {
    const { data } = await API.post(API_ENDPOINTS.TENANT.CREATE, payload);

    return data;
  },
};
