import { sidebarItems } from "./sidebar.config";

import { useRBAC } from "@/shared/hooks/useRBAC";
import { useSidebarStore } from "@/store/sidebar.store";

import { NavLink } from "react-router-dom";

export const SidebarMenu = () => {
  const { can } = useRBAC();

  const close = useSidebarStore((state) => state.close);

  const menus = sidebarItems.filter(
    (item) => !item.permission || can(item.permission),
  );

  return (
    <nav className="p-3">
      <ul className="space-y-3">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <NavLink
                onClick={close}
                to={item.path}
                className={({ isActive }) => `flex items-center gap-3
                  rounded-md px-4 py-2
                  transition-all duration-200 ${
                    isActive
                      ? `bg-linear-to-r
                      from-teal-500
                      to-teal-200
                      hover:from-teal-600
                      hover:to-teal-600 text-white`
                      : "hover:bg-info/10"
                  }`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
