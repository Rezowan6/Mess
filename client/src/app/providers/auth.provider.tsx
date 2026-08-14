import { useEffect, type ReactNode } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { PageLoader } from "@/shared/components/feedback/PageLoader";
import { tokenStorage } from "@/shared/utils/token";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const token = tokenStorage.get();

  const initialized = useAuthStore((state) => state.isInitialized);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  const currentTenant = useTenantStore((state) => state.currentTenant);
  const setTenant = useTenantStore((state) => state.setTenant);

  const { data: user, isLoading } = useMe({
    enabled: !!token,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user?.tenantMemberships?.length) {
      const membership =
        user.tenantMemberships.find(
          (item) => item.tenantId === currentTenant?.tenantId,
        ) ?? user.tenantMemberships[0];

      setTenant({
        tenantId: membership.tenantId,
        role: membership.role,
        status: membership.status,
        tenant: membership.tenant,
      });
    }

    setInitialized(true);
  }, [isLoading, user, currentTenant?.tenantId, setTenant, setInitialized]);

  if (!initialized) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
