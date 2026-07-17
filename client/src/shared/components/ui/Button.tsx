import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",

  secondary: "bg-gray-600 hover:bg-gray-700 text-white",

  accent: "bg-purple-600 hover:bg-purple-700 text-white",

  success: "bg-green-600 hover:bg-green-700 text-white",

  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",

  error: "bg-red-600 hover:bg-red-700 text-white",

  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
};
const sizeClasses = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost";

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

  confirmAction?: boolean;

  confirmMessage?: string;
}

export const Button = ({
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

  className,

  onClick,

  disabled,

  ...props
}: ButtonProps) => {
  const { can } = useRBAC();

  if (permission && !can(permission)) {
    return null;
  }

  const button = (
    <button
      className={clsx(
        "btn",
        variantClasses[variant],
        size !== "md" && `${sizeClasses[size]}`,
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || loading}
      {...props}
      onClick={onClick}
    >
      {!loading && leftIcon}

      {loading ? loadingText : children}

      {!loading && rightIcon}
    </button>
  );

  if (!tooltip) {
    return button;
  }
  return (
    <div className="tooltip" data-tip={tooltip}>
      {button}
    </div>
  );
};
