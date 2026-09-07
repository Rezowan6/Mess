import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const TenantName = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return (
    <>
      <h2
      className="bg-linear-to-r
      from-success
      via-accent
      to-primary
      bg-clip-text
      text-xl font-bold
      text-transparent
      bg-[length:200%_auto]
      animate-[gradient_4s_ease_infinite]
      "
      >
        {currentTenant?.tenant.name}
      </h2>
    </>
  );
};
