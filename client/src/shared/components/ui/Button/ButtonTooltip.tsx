import clsx from "clsx";
import type { ReactNode } from "react";

import { TOOLTIP_PLACEMENT, TOOLTIP_STYLE } from "./button.styles";
import type { TooltipPlacement } from "./button.types";

interface ButtonTooltipProps {
  tooltip: string;
  placement: TooltipPlacement;
  fullWidth: boolean;
  children: ReactNode;
}

export const ButtonTooltip = ({
  tooltip,
  placement,
  fullWidth,
  children,
}: ButtonTooltipProps) => {
  return (
    <div
      className={clsx(
        "tooltip",
        TOOLTIP_PLACEMENT[placement],
        TOOLTIP_STYLE,
        fullWidth && "w-full",
      )}
      data-tip={tooltip}
    >
      {children}
    </div>
  );
};
