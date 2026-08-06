import { Outlet } from "react-router-dom";

import { Header } from "@/shared/components/layout/header/Header";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";
import { MobileSidebar } from "@/shared/components/layout/sidebar/MobileSidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mt-16 flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
