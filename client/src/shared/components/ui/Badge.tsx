import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";

export type BadgeVariant =
  | "success"
  | "accent"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "secondary"
  | "neutral";

interface BadgeProps {
  children: ReactNode;

  variant?: BadgeVariant;

  size?: "sm" | "md" | "lg";

  rounded?: "full" | "md" | "sm";

  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-gradient-success",

  accent: "bg-gradient-accent",

  warning: "bg-gradient-warning",

  error: "bg-gradient-error",

  info: "bg-gradient-info",

  primary: "bg-gradient-primary",

  secondary: "bg-gradient-secondary",

  neutral: "bg-surface-hover text-text",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",

  md: "px-3 py-1 text-sm",

  lg: "px-4 py-1.5 text-base",
};

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  rounded = "full",
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap text-secondary-content",

        variantStyles[variant],

        sizeStyles[size],

        rounded === "full" ? "rounded-full" : "rounded-sm",

        className,
      )}
    >
      {children}
    </span>
  );
};
