import clsx from "clsx";
import { useState, type ReactNode } from "react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { TOOLTIP_PLACEMENT, TOOLTIP_STYLE } from "./button.styles";
import type { TooltipPlacement } from "./button.types";

interface ButtonTooltipProps {
  tooltip: string;
  placement: TooltipPlacement;
  fullWidth: boolean;
  children: ReactNode;
}

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;

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
        "tooltip",
        TOOLTIP_PLACEMENT[placement],
        TOOLTIP_STYLE,
        showTooltip && "tooltip-open",
        fullWidth && "w-full",
        "[&_button:disabled]:pointer-events-none",
      )}
      data-tip={tooltip}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};