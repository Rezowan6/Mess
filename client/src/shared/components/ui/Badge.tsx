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
  | "soft-info";

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
};

const sizeStyles = {
  sm: "h-6 px-2 text-xs",
  md: "h-7 px-3 text-sm",
  lg: "h-8 px-4 text-base",
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
        "inline-flex text-center items-center justify-center font-medium whitespace-nowrap leading-none align-middle",

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
