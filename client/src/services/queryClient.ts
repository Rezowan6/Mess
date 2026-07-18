import { MutationCache, QueryClient } from "@tanstack/react-query";

import { showApiErrorToast, showSuccessToast } from "@/shared/utils/toast";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data: any) => {
      if (data?.message) {
        showSuccessToast(data.message);
      }
    },

    onError: (error) => {
      showApiErrorToast(error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },

    mutations: {
      retry: 1,
    },
  },
});
