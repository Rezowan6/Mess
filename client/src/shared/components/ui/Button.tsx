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
  | "tab";

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
    border border-info/20
    bg-white/5
    text-info
    backdrop-blur-xl
    hover:bg-info/10
    hover:border-info/40
  `,

  moduleBtn: `
    border border-teal-300/20
    bg-gradient-to-r from-teal-500/80 to-green-600/80
    backdrop-blur-xl
    shadow-lg shadow-teal-500/10
    hover:from-teal-500 hover:to-green-500
    hover:shadow-xl hover:shadow-teal-500/20
  `,

  primary: `
    border border-blue-300/20
    bg-gradient-to-r from-blue-500/80 to-indigo-700/80
    backdrop-blur-xl
    shadow-lg shadow-blue-500/10
    hover:from-blue-500 hover:to-indigo-600
    hover:shadow-xl hover:shadow-blue-500/20
  `,

  success: `
    border border-emerald-300/20
    bg-gradient-to-r from-teal-500/80 to-emerald-600/80
    backdrop-blur-xl
    shadow-lg shadow-emerald-500/10
    hover:from-teal-500 hover:to-emerald-500
    hover:shadow-xl hover:shadow-emerald-500/20
  `,

  error: `
    border border-red-300/20
    bg-gradient-to-r from-red-500/80 to-pink-600/80
    backdrop-blur-xl
    shadow-lg shadow-red-500/10
    hover:from-red-500 hover:to-pink-500
    hover:shadow-xl hover:shadow-red-500/20
  `,

  warning: `
    border border-yellow-300/20
    bg-gradient-to-r from-yellow-500/80 to-orange-500/80
    backdrop-blur-xl
    shadow-lg shadow-yellow-500/10
    hover:from-yellow-500 hover:to-orange-500
    hover:shadow-xl hover:shadow-orange-500/20
  `,

  secondary: `
    border border-slate-300/20
    bg-gradient-to-r from-slate-500/80 to-slate-700/80
    backdrop-blur-xl
    shadow-lg shadow-slate-500/10
    hover:from-slate-500 hover:to-slate-600
    hover:shadow-xl hover:shadow-slate-500/20
  `,

  accent: `
    border border-purple-300/20
    bg-gradient-to-r from-purple-500/80 to-pink-600/80
    backdrop-blur-xl
    shadow-lg shadow-purple-500/10
    hover:from-purple-500 hover:to-pink-500
    hover:shadow-xl hover:shadow-purple-500/20
  `,

  ghost: `
    border border-white/10
    bg-white/5
    text-base-content
    backdrop-blur-xl
    hover:bg-white/10
    hover:border-white/20
  `,

  outline: `
    border border-base-content/20
    bg-white/5
    text-base-content
    backdrop-blur-xl
    hover:bg-white/10
    hover:border-info/40
  `,

  normal: `
    border border-teal-300/20
    bg-gradient-to-r from-teal-500/80 to-teal-800/80
    backdrop-blur-xl
    shadow-lg shadow-teal-500/10
    hover:from-teal-500 hover:to-teal-700
    hover:shadow-xl hover:shadow-teal-500/20
  `,
} satisfies Record<ButtonVariant, string>;

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

    const button = (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          !unstyled && [
            variantClasses[variant],
            "relative overflow-hidden rounded-xl px-4 sm:h-10 flex items-center justify-center gap-2 text-white font-medium",
            "backdrop-blur-xl transition-all duration-300 ease-out",
            "hover:-translate-y-0.5 active:translate-y-0",
            "disabled:opacity-50 disabled:pointer-events-none",
            "focus:outline-none focus:ring-2 focus:ring-info/30",
          ],

          "cursor-pointer bg-info/20 hover:bg-info/40 p-2 rounded-sm disabled:opacity-50 disabled:pointer-events-none transition-all duration-300",

          fullWidth && "w-full",

          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />

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
      <div className="tooltip tooltip-top" data-tip={tooltip}>
        {button}
      </div>
    );
  },
);

Button.displayName = "Button";
