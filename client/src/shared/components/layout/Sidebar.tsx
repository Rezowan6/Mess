import { NavLink } from "react-router-dom";

import { sidebarItems } from "@/shared/constants/sideber";

import { useRBAC } from "@/shared/hooks/useRBAC";

export const Sidebar = () => {
  const { can } = useRBAC();

  const menus = sidebarItems.filter(
    (item) => !item.permission || can(item.permission),
  );

  return (
    <aside className="w-64 border-r bg-base-100">
      <div className="p-4">
        <h2 className="text-xl font-bold">Mess SaaS</h2>
      </div>

      <ul>
        {menus.map((item) => (
          <li key={item.path} className="glass p-3 mb-2 hover:bg-base-200">
            <NavLink to={item.path}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
