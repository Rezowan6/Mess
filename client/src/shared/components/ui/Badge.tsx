import { cn } from "@/shared/utils/cn";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type IBadgeVariant =
  | "success"
  | "accent"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "secondary"
  | "neutral"
  | "soft-info"
  | "soft-success"
  | "soft-secondary"
  | "soft-warning"
  | "soft-error";

interface BadgeProps {
  children: ReactNode;

  variant?: IBadgeVariant;

  size?: "sm" | "md" | "lg";

  rounded?: "full" | "md" | "sm";

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  className?: string;
}

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
} as const;

const variantStyles: Record<IBadgeVariant, string> = {
  success: "bg-theme-success text-theme-on-brand",

  accent: "bg-theme-secondary text-theme-on-brand",

  warning: "bg-theme-warning text-theme-on-brand",

  error: "bg-theme-danger text-theme-on-brand",

  info: "bg-theme-info text-theme-on-brand",

  primary: "bg-theme-brand text-theme-on-brand",

  secondary: "bg-theme-accent text-theme-on-brand",

  neutral: "bg-theme-surface-hover text-theme-text",

  "soft-info": "bg-theme-info-soft text-theme-info",
  "soft-success": "bg-theme-success-soft text-theme-success",
  "soft-secondary": "bg-theme-secondary-soft text-theme-secondary",
  "soft-warning": "bg-theme-warning-soft text-theme-warning",
  "soft-error": "bg-theme-danger-soft text-theme-danger",
};

const sizeStyles = {
  sm: "h-6 p-3 text-xs",
  md: "h-7 px-4 text-sm",
  lg: "h-8 px-5 text-base",
};

const roundedStyles = {
  full: "rounded-full",
  md: "rounded-theme-md",
  sm: "rounded-theme-sm",
};

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  rounded = "full",
  leftIcon,
  rightIcon,
  className,
}: BadgeProps) => {
  const renderIcon = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ size?: number }>, {
          size: iconSizes[size],
        })
      : null;

  return (
    <span
      className={cn(
        "inline-flex capitalize text-center items-center justify-center gap-1 font-medium whitespace-nowrap leading-none align-middle text-white",

        variantStyles[variant],

        sizeStyles[size],

        roundedStyles[rounded],

        className,
      )}
    >
      {renderIcon(leftIcon)}

      {children}

      {renderIcon(rightIcon)}
    </span>
  );
};
