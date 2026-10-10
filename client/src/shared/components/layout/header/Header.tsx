import { MealSessionSelector } from "@/modules/dashboard/components/header/MealSessionSelector";
import { MealSessionStatus } from "@/modules/dashboard/components/header/MealSessionStatus";
import { NotificationBell } from "@/modules/notification/components/NotificationBell";
import { BackButton } from "../../ui/BackButton";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-theme-border bg-theme-header backdrop-blur-xl">
      <div className="flex h-16 w-full items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
        <BackButton />

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 lg:gap-6">
          <MealSessionSelector />

          <div className="hidden shrink-0 sm:block">
            <MealSessionStatus />
          </div>

          <NotificationBell />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};