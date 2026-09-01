import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import type { ISidebarItem } from "../layout/sidebar/sidebar.config";

interface Props {
  menus: ISidebarItem[];
  isMoreActive: boolean;
  isMoreOpen: boolean;
  onMoreClick: () => void;
}

export const MobileBottomNavBar = ({
  menus,
  isMoreActive,
  isMoreOpen,
  onMoreClick,
}: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-base-300 lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {menus.slice(0, 4).map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isActive ? "font-semibold text-accent" : "text-text"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />

                <span className="max-w-20 truncate">{title}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* More */}

        <button
          type="button"
          onClick={onMoreClick}
          className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
            isMoreActive || isMoreOpen
              ? "font-semibold text-accent"
              : "text-base-content/70"
          }`}
          aria-label="More"
          aria-expanded={isMoreOpen}
        >
          <MoreHorizontal
            size={21}
            strokeWidth={isMoreActive || isMoreOpen ? 2.5 : 2}
          />

          <span>More</span>
        </button>
      </div>
    </nav>
  );
};
