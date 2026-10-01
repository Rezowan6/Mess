import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";

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

  className?: string;
}

const variantStyles: Record<IBadgeVariant, string> = {
  success: "bg-gradient-success",

  accent: "bg-gradient-accent",

  warning: "bg-gradient-warning",

  error: "bg-gradient-error",

  info: "bg-gradient-info",

  primary: "bg-gradient-primary",

  secondary: "bg-gradient-secondary",

  neutral: "bg-surface-hover text-text",

  "soft-info": "bg-info/10 text-info",
  "soft-success": "bg-success/10 text-success",
  "soft-secondary": "bg-secondary/10 text-secondary",
  "soft-warning": "bg-warning/10 text-warning",
  "soft-error": "bg-error/10 text-error",
};

const sizeStyles = {
  sm: "h-6 p-3 text-xs",
  md: "h-7 px-4 text-sm",
  lg: "h-8 px-5 text-base",
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
        "inline-flex capitalize text-center items-center justify-center font-medium whitespace-nowrap leading-none align-middle text-white",

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
