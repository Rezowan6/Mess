import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

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
        `btn-${variant}`,
        size !== "md" && `btn-${size}`,
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || loading}
      {...props}
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
