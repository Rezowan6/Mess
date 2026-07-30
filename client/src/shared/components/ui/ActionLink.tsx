import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  state?: unknown;
  children: ReactNode;
  className?: string;
}

export const ActionLink = ({ to, state, children, className }: Props) => {
  return (
    <Link
      state={state}
      to={to}
      className={`
        inline-flex items-center justify-center
        rounded-md
        px-3 py-1.5
        text-xs font-medium
        border border-primary
        text-warning
        hover:bg-warning/10
        transition
        ${className ?? ""}
      `}
    >
      {children}
    </Link>
  );
};
