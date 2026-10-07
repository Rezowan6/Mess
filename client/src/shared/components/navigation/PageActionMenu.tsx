import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import type {
  IPageActionMenuItem,
  PageActionMenuPlacement,
} from "./pageActionMenu.types";

interface PageActionMenuProps {
  items: IPageActionMenuItem[];
  placement?: PageActionMenuPlacement;
  label?: string;
}

export const PageActionMenu = ({
  items,
  placement = "bottom-end",
  label = "More options",
}: PageActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Outside click
  const menuRef = useClickOutside<HTMLDivElement>(closeMenu);

  // Escape key
  useEscapeKey(closeMenu, isOpen);

  const placementClass = {
    "bottom-start": "left-0 top-full mt-2 origin-top-left",
    "bottom-end": "right-0 top-full mt-2 origin-top-right",
    "top-start": "bottom-full left-0 mb-2 origin-bottom-left",
    "top-end": "bottom-full right-0 mb-2 origin-bottom-right",
  }[placement];

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="
          flex items-center justify-center
          rounded-theme-lg p-2
          text-theme-text
          transition-all duration-200
          hover:bg-theme-info-soft
          active:scale-95
        "
      >
        <MoreVertical size={21} />
      </button>

      {/* Menu */}
      <div
        role="menu"
        className={`
          absolute z-50
          w-60
          overflow-hidden
          rounded-theme-xl
          border border-theme-border
          backdrop-blur-xl
          shadow-theme-xl

          transition-all duration-200 ease-out

          ${placementClass}

          ${
            isOpen
              ? "visible scale-100 opacity-100"
              : "pointer-events-none invisible scale-95 opacity-0"
          }
        `}
      >
        <div className="p-1.5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;

                  item.onClick();
                  closeMenu();
                }}
                className={`
                  flex w-full items-center gap-3
                  rounded-theme-lg px-3 py-2.5
                  text-left text-sm
                  transition-colors

              ${
                item.danger
                  ? "text-theme-danger hover:bg-theme-danger-soft"
                  : "text-theme-text hover:bg-theme-info-soft"
              }

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                `}
              >
                {Icon && <Icon size={17} />}

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
