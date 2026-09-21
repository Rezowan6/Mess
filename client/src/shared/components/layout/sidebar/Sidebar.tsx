import { UpgradeButton } from "@/modules/subscription/components/UpgradeButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { TenantName } from "../../ui/TenantName";
import { SidebarMenu } from "./SidebarMenu";

export const Sidebar = () => {
  const { can } = useRBAC();
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 shrink-0 z-40 flex-col border-r border-info/20 bg-background">
      <div className="flex h-16 shrink-0 items-center border-b border-info/20 px-4">
        <TenantName />
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu />
      </div>

      {/* <SidebarProfile /> */}
      {can(PERMISSIONS.SUBSCRIPTION_CREATE) && (
        <div className="border-t border-info/20 p-3">
          <UpgradeButton />
        </div>
      )}
    </aside>
  );
};
