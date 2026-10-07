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

  return (
    <>
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-theme-overlay
          transition-opacity
          duration-300
          lg:hidden
          ${
            isOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* More Menu */}

      <div
        className={`
          fixed
          bottom-17
          right-3
          z-50
          w-64
          overflow-hidden
          rounded-theme-xl
          border
          border-theme-border
          bg-theme-surface-raised
          shadow-theme-lg
          transition-all
          duration-300
          ease-in-out
          lg:hidden
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-2 opacity-0"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-theme-border mx-4 py-3">
          <h3 className="font-semibold text-theme-text">More</h3>

          <button
            type="button"
            onClick={onClose}
            className="
              cursor-pointer
              rounded-theme-lg
              p-1.5
              text-theme-text-muted
              transition-colors
              duration-200
              hover:bg-theme-info-soft
              hover:text-theme-text
            "
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
                `mb-1 flex items-center gap-3 rounded-theme-lg px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-theme-brand-soft font-semibold text-theme-accent"
                    : "text-theme-text hover:bg-theme-info-soft"
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
