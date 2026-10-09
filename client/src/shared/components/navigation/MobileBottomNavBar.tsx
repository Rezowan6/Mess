import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import type { ISidebarItem } from "../layout/sidebar/sidebar.config";

interface Props {
  menus: ISidebarItem[];
  moreMenus: ISidebarItem[];
  isMoreActive: boolean;
  isMoreOpen: boolean;
  onMoreClick: () => void;
}

const itemClass = (isActive: boolean) =>
  clsx(
    "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium",
    "transition-all duration-200 active:scale-95",
    isActive
      ? "scale-105 font-semibold text-theme-success"
      : "text-theme-text-muted hover:text-theme-text",
  );

export const MobileBottomNavBar = ({
  menus,
  moreMenus,
  isMoreActive,
  isMoreOpen,
  onMoreClick,
}: Props) => {
  const primaryMenus = menus.slice(0, 4);
  const hasMoreMenus = moreMenus.length > 0;
  const isMoreHighlighted = isMoreActive || isMoreOpen;

  return (
    <nav className="pointer-events-auto fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 lg:hidden">
      <div
        className={clsx(
          "mx-auto flex h-16 max-w-md items-center justify-around px-2",
          "rounded-full border border-theme-border",
          "bg-theme-surface",
          "backdrop-blur-2xl backdrop-saturate-150",
          "shadow-[0_8px_32px_-8px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.35)]",
        )}
      >
        {primaryMenus.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => itemClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />

                <span className="max-w-full truncate tracking-tight">
                  {title}
                </span>
              </>
            )}
          </NavLink>
        ))}

        {hasMoreMenus && (
          <button
            type="button"
            onClick={onMoreClick}
            className={itemClass(isMoreHighlighted)}
            aria-label="More"
            aria-expanded={isMoreOpen}
          >
            <MoreHorizontal
              size={22}
              strokeWidth={isMoreHighlighted ? 2.5 : 1.8}
            />

            <span className="tracking-tight">More</span>
          </button>
        )}
      </div>
    </nav>
  );
};
