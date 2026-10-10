import { MealSessionSelector } from "@/modules/dashboard/components/header/MealSessionSelector";
import { MealSessionStatus } from "@/modules/dashboard/components/header/MealSessionStatus";
import { NotificationBell } from "@/modules/notification/components/NotificationBell";
import { BackButton } from "../../ui/BackButton";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 bg-theme-header border-b border-theme-border transition-all duration-300 backdrop-blur-xl`}
    >
      <div className="flex h-16 w-full items-center px-3 sm:px-4 lg:px-6">
        <div className="ml-auto flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-4 lg:gap-6">
          {/* Back */}
          <BackButton />
          {/* Meal Session Selector */}
          <div className="shrink-0">
            <MealSessionSelector />
          </div>

          {/* Session Status */}
          <div className="shrink-0">
            <MealSessionStatus />
          </div>

          {/* Notification */}
          <div className="shrink-0">
            <NotificationBell />
          </div>

          {/* Profile */}
          <div className="shrink-0">
            <HeaderProfile />
          </div>
        </div>
      </div>
    </header>
  );
};
