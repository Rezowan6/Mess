import { Outlet } from "react-router-dom";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { Header } from "@/shared/components/layout/header/Header";
import { MobileSidebar } from "@/shared/components/layout/sidebar/MobileSidebar";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";
import { MobileBottomNav } from "@/shared/components/navigation/MobileBottomNav";

export const DashboardLayout = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  const role = currentTenant?.role ?? "";

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      {role !== "member" && <MobileSidebar />}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mt-16 flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {role === "member" && <MobileBottomNav />}
    </div>
  );
};
