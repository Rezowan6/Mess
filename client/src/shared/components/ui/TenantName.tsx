import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const TenantName = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return (
    <>
      <h2 className="text-xl font-bold text-accent">
        {currentTenant?.tenant.name}
      </h2>
    </>
  );
};
