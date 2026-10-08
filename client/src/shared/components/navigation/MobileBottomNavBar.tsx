import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useSlidingIndicator } from "@/shared/hooks/useSlidingIndicator";

import type { ISidebarItem } from "../layout/sidebar/sidebar.config";
import { SlidingTabIndicator } from "../ui/SlidingTabIndicator";

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
  // const scrolled = useScrolled();
  // ${
  //     scrolled
  //       ? "border-t border-theme-border bg-theme-header shadow-theme-lg backdrop-blur-xl"
  //       : "border-t border-theme-border bg-theme-header shadow-theme-md backdrop-blur-xl"
  //   }

  const primaryMenus = menus.slice(0, 4);

  const hasMoreMenus = moreMenus.length > 0;

  const activeKey =
    menus.find((menu) => window.location.pathname === menu.path)?.path ??
    (isMoreActive || isMoreOpen ? "more" : undefined);

  const { containerRef, setItemRef, indicator } = useSlidingIndicator({
    activeKey,
    itemCount: primaryMenus.length + (hasMoreMenus ? 1 : 0),
  });

  return (
    <nav
      ref={containerRef}
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-theme-header border-t border-theme-border transition-all duration-300
    
  `}
    >
      <SlidingTabIndicator
        width={indicator.width}
        left={indicator.left}
        ready={indicator.ready}
      />
      <div className="flex h-16 w-full">
        {primaryMenus.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            ref={setItemRef(path)}
            className={({ isActive }) =>
              `relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
                isActive
                  ? "font-semibold text-white!"
                  : "text-theme-text hover:text-theme-info"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />

                <span className="truncate max-w-fit text-xs">{title}</span>
              </>
            )}
          </NavLink>
        ))}

        {hasMoreMenus && (
          <button
            ref={setItemRef("more")}
            type="button"
            onClick={onMoreClick}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
              isMoreActive || isMoreOpen
                ? "font-semibold text-theme-accent"
                : "text-theme-text hover:text-theme-info"
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
