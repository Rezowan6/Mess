import clsx from "clsx";
import { useState, type ReactNode } from "react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import type { TooltipPlacement } from "./button.types";

interface ButtonTooltipProps {
  tooltip: string;
  placement: TooltipPlacement;
  fullWidth: boolean;
  children: ReactNode;
}

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const PLACEMENT_CLASS: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export const ButtonTooltip = ({
  tooltip,
  placement,
  fullWidth,
  children,
}: ButtonTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setShowTooltip(false));

  const handleClick = () => {
    if (canHover()) return;
    setShowTooltip((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "group relative inline-flex",
        fullWidth && "w-full",
        "[&_button:disabled]:pointer-events-none",
      )}
      onClick={handleClick}
    >
      {children}

      <span
        role="tooltip"
        className={clsx(
          "pointer-events-none absolute z-50 min-w-52 whitespace-normal warp-break-words",
          "rounded-theme-lg bg-theme-tooltip px-3 py-2 text-center text-xs font-medium leading-snug text-theme-tooltip-text shadow-theme-lg",
          "transition-opacity duration-150",
          PLACEMENT_CLASS[placement],
          showTooltip
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
        )}
      >
        {tooltip}
      </span>
    </div>
  );
};
