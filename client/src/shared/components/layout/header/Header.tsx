import { TenantSwitcher } from "@/modules/tenant/components/TenantSwitcher";

export const Header = () => {
  return (
    <header className="border-b bg-base-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <div>
          <TenantSwitcher />
        </div>
      </div>
    </header>
  );
};
