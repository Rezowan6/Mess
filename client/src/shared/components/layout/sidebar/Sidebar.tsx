import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfile } from "./SidebarProfile";

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-base-100">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Mess SaaS</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarMenu />
      </div>

      <SidebarProfile />
    </aside>
  );
};
