import { create } from "zustand";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

interface DashboardSessionState {
  /** ব্যবহারকারী যে session বেছেছেন। null মানে "default (সর্বশেষ closed)" */
  mealSessionId: number | undefined;
  select: (mealSessionId: number) => void;
  reset: () => void;
}

export const useDashboardSessionStore = create<DashboardSessionState>()(
  (set) => ({
    mealSessionId: undefined,
    select: (mealSessionId) => set({ mealSessionId }),
    reset: () => set({ mealSessionId: undefined }),
  }),
);

// Tenant বদলালে (বা logout-এ) নির্বাচন মুছে যাবে।
// Dashboard tenant-এর ওপর নির্ভর করে, তাই নির্ভরতার দিক ঠিক আছে।
// TenantSwitcher-এর কোনো বদল লাগে না, আর A→B→A করলেও পুরোনো নির্বাচন ফিরে আসে না।
useTenantStore.subscribe((state, prevState) => {
  if (state.currentTenant?.tenantId !== prevState.currentTenant?.tenantId) {
    useDashboardSessionStore.getState().reset();
  }
});
