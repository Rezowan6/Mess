import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfile } from "./SidebarProfile";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 shrink-0 z-40 flex-col border-r border-info bg-base-100">
      <div className="flex h-16 shrink-0 items-center border-b border-info px-4">
        <h2 className="text-xl font-bold">Mess SaaS</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu />
      </div>

      <SidebarProfile />
    </aside>
  );
};
