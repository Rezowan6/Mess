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

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-content hover:brightness-110",

  secondary: "bg-secondary text-secondary-content hover:brightness-110",

  accent: "bg-accent text-accent-content hover:brightness-110",

  success: "bg-success text-success-content hover:brightness-110",

  warning: "bg-warning text-warning-content hover:brightness-110",

  error: "bg-error text-error-content hover:brightness-110",

  ghost: "bg-transparent text-text hover:bg-surface-hover",

  outline:
    "border border-border bg-transparent text-text hover:bg-surface-hover",
};

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

          "rounded-lg font-medium",

          "transition-all duration-200",

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
