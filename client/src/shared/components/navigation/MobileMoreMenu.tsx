import { X } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import type { ISidebarItem } from "../layout/sidebar/sidebar.config";

interface Props {
  menus: ISidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMoreMenu = ({ menus, isOpen, onClose }: Props) => {
  const location = useLocation();

  /**
   * Close menu after route change
   */
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/20 lg:hidden"
      />

      {/* More Menu */}
      <div
        className="
          fixed
          bottom-17
          right-3
          z-50
          w-64
          overflow-hidden
          rounded-xl
          border
          border-success
          bg-base-100
          shadow-xl
          lg:hidden
          animate-in
          fade-in
          slide-in-from-bottom-2
          duration-200
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-success px-4 py-3">
          <h3 className="font-semibold">More</h3>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-info/10"
            aria-label="Close more menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {menus.map(({ title, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-info/10 font-semibold text-accent"
                    : "text-text hover:bg-info/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                  <span>{title}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
