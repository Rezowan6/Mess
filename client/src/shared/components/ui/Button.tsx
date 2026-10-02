import clsx from "clsx";
import { Loader2 } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

type ButtonVariant =
  | "moduleBtn"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "outline"
  | "normal"
  | "tab"
  | "pay";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;

  unstyled?: boolean;

  iconSize?: number;

  variant?: ButtonVariant;

  loading?: boolean;

  loadingText?: string;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  tooltip?: string;

  permission?: Permission;
}

const variantClasses = {
  tab: `
    bg-info/20
    hover:bg-info/40
    text-info
  `,
  moduleBtn: `
    bg-gradient-to-r
    from-teal-600
    to-green-600
    hover:from-teal-700
    hover:to-green-700
    hover:shadow-teal-500/30
  `,
  primary: `
    bg-gradient-to-r
    from-blue-600
    to-blue-900
    hover:from-blue-800
    hover:to-blue-600
    hover:shadow-blue-500/30
  `,
  success: `
    bg-gradient-to-r
    from-teal-600
    to-green-600
    hover:from-teal-700
    hover:to-green-700
    hover:shadow-green-500/30
  `,
  error: `
    bg-gradient-to-r
    from-red-500
    to-pink-600
    hover:from-red-600
    hover:to-pink-700
    hover:shadow-red-500/30
  `,
  warning: `
    bg-gradient-to-r
    from-yellow-500
    to-orange-500
    hover:from-yellow-600
    hover:to-orange-600
    hover:shadow-orange-500/30
  `,
  secondary: `
    bg-gradient-to-r
    from-slate-500
    to-slate-700
    hover:from-slate-600
    hover:to-slate-800
    hover:shadow-slate-500/30
  `,
  accent: `
    bg-gradient-to-r
    from-purple-600
    to-pink-600
    hover:from-purple-700
    hover:to-pink-700
    hover:shadow-purple-500/30
  `,
  ghost: `
    bg-transparent
    text-text
    hover:bg-surface-hover
  `,
  outline: `
    border
    border-border
    text-text
    hover:bg-surface-hover
  `,
  normal: `
    bg-secondary/10 text-secondary
    hover:from-teal-600
    hover:to-teal-600
    hover:shadow-teal-500/30
  `,
  pay: `
    bg-gradient-to-b
    from-blue-500
    to-blue-700
    ring-1
    ring-inset
    ring-white/20
    shadow-md
    shadow-blue-900/30
    hover:from-blue-400
    hover:to-blue-600
    hover:shadow-blue-500/40
  `,
} satisfies Record<ButtonVariant, string>;

/** Gradient variants: white text, shadow and lift effect. */
const SOLID_VARIANTS = new Set<ButtonVariant>([
  "moduleBtn",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "normal",
  "pay",
]);

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

    const isSolid = SOLID_VARIANTS.has(variant);
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info/60 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
          "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none",

          unstyled
            ? "inline-flex items-center justify-center gap-2 rounded-md bg-info/20 p-2  hover:bg-info/40"
            : [
                variantClasses[variant],
                "flex items-center justify-center gap-2 rounded-full py-2 px-6 text-sm sm:h-10",
                hasContent ? "px-4" : "px-3",
                isSolid && [
                  "text-white shadow-sm",
                  "hover:-translate-y-px hover:shadow-lg",
                  "active:translate-y-0 active:scale-[0.98]",
                ],
              ],

          fullWidth && "w-full",

          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={iconSize} className="animate-spin" />

            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon &&
              isValidElement(leftIcon) &&
              cloneElement(leftIcon as ReactElement<{ size?: number }>, {
                size: iconSize,
              })}

            {children && <span>{children}</span>}

            {rightIcon &&
              isValidElement(rightIcon) &&
              cloneElement(rightIcon as ReactElement<{ size?: number }>, {
                size: iconSize,
              })}
          </>
        )}
      </button>
    );

    if (!tooltip) {
      return button;
    }

    return (
      <div
        className={clsx("tooltip tooltip-top", fullWidth && "w-full")}
        data-tip={tooltip}
      >
        {button}
      </div>
    );
  },
);

Button.displayName = "Button";