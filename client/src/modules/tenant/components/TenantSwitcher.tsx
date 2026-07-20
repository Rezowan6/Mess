import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { IAuthUser } from "@/modules/auth/types/auth.types";
import { Select } from "@/shared/components/ui/Select";
import { useTenantStore } from "../store/tenant.store";

export const TenantSwitcher = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user) as IAuthUser;

  const currentTenant = useTenantStore((state) => state.currentTenant);

  const setTenant = useTenantStore((state) => state.setTenant);

  if (!user?.tenantMemberships?.length) {
    return null;
  }

  const tenantOptions =
    user?.tenantMemberships?.map((tenantMembership) => ({
      label: tenantMembership.tenant.name,
      value: tenantMembership.tenantId,
    })) ?? [];

  const handleTenantChange = (tenantId: number) => {
    const tenantMembership = user.tenantMemberships.find(
      (item) => item.tenantId === tenantId,
    );

    if (!tenantMembership) return;

    setTenant({
      tenantId: tenantMembership?.tenantId,
      role: tenantMembership?.role,
      status: tenantMembership?.status,
      tenant: tenantMembership?.tenant,
    });

    queryClient.invalidateQueries();
  };

  if (!user?.tenantMemberships?.length) {
    return null;
  }
  return (
    <Select
      value={currentTenant?.tenantId ?? ""}
      options={tenantOptions}
      onChange={(e) => handleTenantChange(Number(e.target.value))}
      placeholder="Switch Tenant"
      className="w 64"
    />
  );
};
