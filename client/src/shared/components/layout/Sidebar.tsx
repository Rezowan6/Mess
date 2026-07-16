import { NavLink } from "react-router-dom";

import { sidebarItems } from "@/shared/constants/sideber";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { Role } from "@/shared/constants/roles";

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  const role = user?.tenantMemberships?.[0]?.role as Role;

  const menus = sidebarItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  return (
    <aside className="w-64 border-r bg-base-100">
      <div className="p-4">
        <h2 className="text-xl font-bold">Mess SaaS</h2>
      </div>

      <ul>
        {menus.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
