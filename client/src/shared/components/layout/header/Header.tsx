import { NotificationBell } from "@/modules/notification/components/NotificationBell";
import { BackButton } from "../../ui/BackButton";
import { TenantName } from "../../ui/TenantName";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-theme-border bg-theme-header backdrop-blur-xl lg:left-64">
      {" "}
      <div className="flex h-16 w-full items-center gap-2 px-3 sm:gap-4 sm:px-4 lg:px-6">
        <BackButton />

        <div className="min-w-0 flex-1 sm:hidden">
          <TenantName />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
          <NotificationBell />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};
