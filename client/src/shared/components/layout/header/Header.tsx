import { NotificationBell } from "@/modules/notification/components/NotificationBell";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { MobileSidebarButton } from "../sidebar/MobileSidebarButton";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);
  return (
    <header className="fixed right-0 left-0 top-0 z-30 border-b border-info bg-base-100">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left */}

        <div className="flex items-center gap-3">
          {currentTenant?.role !== "member" && <MobileSidebarButton />}

          <h1 className="text-xl text-accent font-semibold">
            {currentTenant?.tenant.name}
          </h1>
        </div>

        {/* Right */}

        <div className="flex items-center justify-center gap-6">
          <NotificationBell />

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};
