import type { LucideIcon } from "lucide-react";
import { MoveRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  state?: unknown;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
}

export const ActionLink = ({
  to,
  state,
  children,
  className,
  icon: Icon = MoveRight,
  iconPosition = "right",
  iconSize = 14,
}: Props) => {
  return (
    <Link
      to={to}
      state={state}
      className={`
        text-theme-info
        inline-flex items-center gap-1
        border-b border-transparent
        hover:border-theme-info
        transition-all duration-300 ease-in-out
        w-fit
        text-sm sm:text-md
        ${className ?? ""}
      `}
    >
      {iconPosition === "left" && <Icon size={iconSize} className="shrink-0 relative mt-1" />}

      {children}

      {iconPosition === "right" && <Icon size={iconSize} className="shrink-0 relative mt-1" />}
    </Link>
  );
};
