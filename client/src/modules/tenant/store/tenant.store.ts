import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITenantState } from "../types/tenant.types";

export const useTenantStore = create<ITenantState>()(
  persist(
    (set) => ({
      currentTenant: null,

      setTenant: (tenant) =>
        set({
          currentTenant: tenant,
        }),

      clearTenant: () =>
        set({
          currentTenant: null,
        }),
    }),

    {
      name: "tenant-storage",
    },
  ),
);
