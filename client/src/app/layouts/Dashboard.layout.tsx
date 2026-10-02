import { Outlet } from "react-router-dom";

import { Header } from "@/shared/components/layout/header/Header";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";
import { MobileBottomNav } from "@/shared/components/navigation/MobileBottomNav";
import { ScrollToTopButton } from "@/shared/components/ui/ScrollToTopButton";

export const DashboardLayout = () => {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-h-dvh min-w-0 flex-col lg:pl-64">
        <Header />

        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />

      <ScrollToTopButton />
    </div>
  );
};
