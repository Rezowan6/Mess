import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { sidebarItems } from "./sidebar.config";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useSidebarStore } from "@/store/sidebar.store";

export const DesktopMoreMenu = () => {
  const { can } = useRBAC();
  const closeSidebar = useSidebarStore((state) => state.close);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuRef = useClickOutside<HTMLDivElement>(closeMenu);

  useEscapeKey(closeMenu, isOpen);

  const moreMenus = sidebarItems.filter(
    (item) =>
      item.desktop === "more" && (!item.permission || can(item.permission)),
  );

  if (!moreMenus.length) return null;

  const isMoreActive = moreMenus.some(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`),
  );

  return (
    <div ref={menuRef} className="relative">
      {/* More Button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-3 rounded-theme-md px-4 py-2 transition-all duration-200 ${
          isMoreActive || isOpen
            ? "bg-theme-info-soft"
            : "hover:bg-theme-info-soft"
        }`}
      >
        <MoreHorizontal size={18} />

        <span>More</span>
      </button>

      {/* More Menu */}
      <div
        className={`absolute left-0 top-full z-50 mt-2 w-full min-w-52 origin-top transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ul className="space-y-1">
          {moreMenus.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    closeMenu();
                    closeSidebar();
                  }}
                  className={`flex items-center gap-3 rounded-theme-md px-4 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-theme-sidebar-active text-theme-sidebar-text-active"
                      : "text-theme-sidebar-text hover:bg-theme-sidebar-hover"
                  }`}
                >
                  <Icon size={18} />

                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
