import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "outline";

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: ButtonVariant;

  size?: ButtonSize;

  loading?: boolean;

  loadingText?: string;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  tooltip?: string;

  permission?: Permission;
}

const variantClasses = {
  primary: `
    bg-gradient-to-r 
    from-blue-600 
    to-indigo-600
    hover:from-blue-700 
    hover:to-indigo-700
    text-white
    shadow-md
    hover:scale-105
    `,

  success: `
    bg-gradient-to-r 
    from-teal-600 
    to-green-600
    hover:from-teal-700
    hover:to-green-700
    text-white
    shadow-md
    hover:scale-105
    `,

  error: `
    bg-gradient-to-r
    from-red-500
    to-pink-600
    hover:from-red-600
    hover:to-pink-700
    text-white
    shadow-md
    hover:scale-105
    `,

  warning: `
    bg-gradient-to-r
    from-yellow-500
    to-orange-500
    hover:from-yellow-600
    hover:to-orange-600
    text-white
    shadow-md
    hover:scale-105
    `,

  secondary: `
    bg-gradient-to-r
    from-slate-500
    to-slate-700
    hover:from-slate-600
    hover:to-slate-800
    text-white
    shadow-md
    `,

  accent: `
    bg-gradient-to-r
    from-purple-600
    to-pink-600
    hover:from-purple-700
    hover:to-pink-700
    text-white
    shadow-md
    hover:scale-105
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
} satisfies Record<ButtonVariant, string>;

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-8 px-3 text-xs",

  sm: "h-9 px-4 text-sm",

  md: "h-10 px-5 text-sm",

  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,

      variant = "primary",

      size = "md",

      loading = false,

      loadingText = "Loading...",

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
          "inline-flex items-center justify-center gap-2 cursor-pointer",

          "rounded-md font-medium",

          "transition-all duration-300",

          "focus:outline-none",

          "focus:ring-4 focus:ring-primary/20",

          "disabled:pointer-events-none",

          "disabled:opacity-50",

          sizeClasses[size],

          variantClasses[variant],

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
            {leftIcon}

            <span>{children}</span>

            {rightIcon}
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
