import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { MoveRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface Props {
  to: string;
  state?: unknown;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  /** false = no arrow icon (default: true) */
  showIcon?: boolean;
  /** false = no border on hover (default: true) */
  showHoverBorder?: boolean;
  /** The link is available only to users who have this permission */
  permission?: Permission;
  /** Without the permission: render nothing, or the children without a link */
  onDenied?: "hide" | "plain";
}

export const ActionLink = ({
  to,
  state,
  children,
  className,
  icon: Icon = MoveRight,
  iconPosition = "right",
  iconSize = 14,
  showIcon = true,
  showHoverBorder = true,
  permission,
  onDenied = "hide",
}: Props) => {
  const { can } = useRBAC();

  if (permission && !can(permission)) {
    return onDenied === "plain" ? <>{children}</> : null;
  }

  const icon = showIcon ? (
    <Icon size={iconSize} className="relative mt-1 shrink-0" />
  ) : null;

  return (
    <Link
      to={to}
      state={state}
      className={clsx(
        "inline-flex w-fit items-center gap-1 text-sm text-theme-info sm:text-base",
        showHoverBorder &&
          "border-b border-transparent transition-all duration-300 ease-in-out hover:border-theme-info",
        className,
      )}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </Link>
  );
};
