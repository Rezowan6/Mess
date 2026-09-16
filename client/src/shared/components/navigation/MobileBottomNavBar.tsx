import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import useScrolled from "@/shared/hooks/useScrolled";
import type { ISidebarItem } from "../layout/sidebar/sidebar.config";

interface Props {
  menus: ISidebarItem[];
  moreMenus: ISidebarItem[];
  isMoreActive: boolean;
  isMoreOpen: boolean;
  onMoreClick: () => void;
}

export const MobileBottomNavBar = ({
  menus,
  moreMenus,
  isMoreActive,
  isMoreOpen,
  onMoreClick,
}: Props) => {
  const scrolled = useScrolled();

  const primaryMenus = menus.slice(0, 4);

  const hasMoreMenus = moreMenus.length > 0;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300
    ${
      scrolled
        ? "border-t border-info/10 bg-background shadow-2xl shadow-info backdrop-blur-xl"
        : "border-t border-info/10 bg-background shadow-2xl backdrop-blur-xl"
    }
  `}
    >
      <div className="flex h-16 w-full">
        {primaryMenus.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
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

        {hasMoreMenus && (
          <button
            type="button"
            onClick={onMoreClick}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
              isMoreActive || isMoreOpen
                ? "font-semibold text-accent"
                : "text-text"
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
        )}
      </div>
    </nav>
  );
};
