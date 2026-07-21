import { MobileSidebarButton } from "../sidebar/MobileSidebarButton";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b bg-base-100">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left */}

        <div className="flex items-center gap-3">
          <MobileSidebarButton />

          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Right */}

        <div className="flex items-center">
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};
