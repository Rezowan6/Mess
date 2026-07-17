import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { IAuthUser } from "@/modules/auth/types/auth.types";
import { useTenantStore } from "../store/tenant.store";

export const TenantSwitcher = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user) as IAuthUser;

  const currentTenant = useTenantStore((state) => state.currentTenant);

  const setTenant = useTenantStore((state) => state.setTenant);

  const handleTenantChange = (
    tenantMembership: (typeof user.tenantMemberships)[number],
  ) => {
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
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost">
        {currentTenant?.tenant?.name ?? "Switch Tenant"}
      </label>

      <ul
        tabIndex={0}
        className="menu dropdown-content w-64 rounded-box bg-base-100 p-2 shadow"
      >
        {user?.tenantMemberships?.map((tenantMembership) => (
          <li key={tenantMembership.tenantId}>
            <button onClick={() => handleTenantChange(tenantMembership)}>
              {tenantMembership?.tenant?.name}

              {currentTenant?.tenantId === tenantMembership?.tenantId && (
                <span className="text-green-500 font-bold">✓</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
