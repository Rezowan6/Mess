import {useMutation, useQueryClient} from "@tanstack/react-query";

import { mealRequestApi } from "../api/mealRequest.api";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useTenantStore } from '@/modules/tenant/store/tenant.store';



export const useCreateMealRequest = () => { 
    const queryClient = useQueryClient();

    const currentTenant = useTenantStore((state) => state.currentTenant);

    return useMutation({
        mutationFn: mealRequestApi.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.mealRequests.myRequests(currentTenant?.tenantId)
            })
        }
    })
}