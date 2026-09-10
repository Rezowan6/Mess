import { useEffect, type ReactNode } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { PageLoader } from "@/shared/components/feedback/PageLoader";
import { useOnlineStatus } from "@/shared/hooks/useOnlineStatus";
import { tokenStorage } from "@/shared/utils/token";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { isOffline } = useOnlineStatus();

  const token = tokenStorage.get();

  const initialized = useAuthStore((state) => state.isInitialized);
  const storedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  const currentTenant = useTenantStore((state) => state.currentTenant);
  const setTenant = useTenantStore((state) => state.setTenant);

  const {
    data: meUser,
    isLoading,
    isError,
  } = useMe({
    enabled: !!token && !isOffline,
  });

  useEffect(() => {
    // Wait until /auth/me request finishes
    if (isLoading) {
      return;
    }

    /**
     * Online:
     *
     * If /auth/me succeeds, use the fresh user data.
     */
    if (meUser) {
      setUser(meUser);

      if (meUser.tenantMemberships?.length) {
        const membership =
          meUser.tenantMemberships.find(
            (item) => item.tenantId === currentTenant?.tenantId,
          ) ?? meUser.tenantMemberships[0];

        setTenant({
          tenantId: membership.tenantId,
          role: membership.role,
          status: membership.status,
          tenant: membership.tenant,
        });
      }

      setInitialized(true);
      return;
    }

    /**
     * Offline:
     *
     * Keep the persisted user from Zustand.
     * Do not clear the user or redirect to 403.
     */
    if (isOffline && storedUser) {
      setInitialized(true);
      return;
    }

    /**
     * Online but /auth/me failed.
     *
     * Do not overwrite the existing persisted user.
     * This allows the application to remain usable if
     * the failure is temporary.
     */
    if (isError && storedUser) {
      setInitialized(true);
      return;
    }

    /**
     * No authenticated user available.
     */
    setInitialized(true);
  }, [
    isLoading,
    isError,
    isOffline,
    meUser,
    storedUser,
    currentTenant?.tenantId,
    setUser,
    setTenant,
    setInitialized,
  ]);

  if (!initialized) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
