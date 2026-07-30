import { MoveRight } from "lucide-react";
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
        text-info 
        flex justify-center items-center gap-1
        hover:border-b border-info
        w-fit
        ${className ?? ""}
      `}
    >
      view details <MoveRight size={16} />
    </Link>
  );
};
