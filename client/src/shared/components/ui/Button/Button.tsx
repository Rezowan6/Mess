import clsx from "clsx";
import { forwardRef } from "react";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { variantClasses } from "./button.styles";
import type { ButtonProps } from "./button.types";
import { ButtonContent } from "./ButtonContent";
import { ButtonTooltip } from "./ButtonTooltip";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      unstyled = false,
      iconSize = 16,

      variant = "primary",

      loading = false,

      loadingText = "Processing...",

      fullWidth = false,

      leftIcon,

      rightIcon,

      tooltip,

      tooltipPlacement = "left",

      permission,

      disabled,

      className,

      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    if (permission && !can(permission)) {
      return null;
    }

    const hasContent = Boolean(children);

    const button = (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={clsx(
          // Shared base
          "cursor-pointer select-none whitespace-nowrap font-medium",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:shadow-theme-focus",
          "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none",

          unstyled
            ? "inline-flex items-center justify-center"
            : [
                variantClasses[variant],
                "flex items-center justify-center gap-2 rounded-full py-2 text-sm ",
                hasContent ? "px-4" : "px-3",
              ],

          fullWidth && "w-full",

          className,
        )}
        {...props}
      >
        <ButtonContent
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          loading={loading}
          loadingText={loadingText}
          iconSize={iconSize}
        >
          {children}
        </ButtonContent>
      </button>
    );

    if (!tooltip) {
      return button;
    }

    return (
      <ButtonTooltip
        tooltip={tooltip}
        placement={tooltipPlacement}
        fullWidth={fullWidth}
      >
        {button}
      </ButtonTooltip>
    );
  },
);

Button.displayName = "Button";
