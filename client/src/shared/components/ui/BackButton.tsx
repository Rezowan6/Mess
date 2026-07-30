import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

export const BackButton = ({ to, children = "Back", className }: Props) => {
  return (
    <Link
      to={to}
      className={`
        text-info
        inline-flex items-center gap-1
        border-b border-transparent
        hover:border-info
        transition-all duration-300 ease-in-out
        w-fit
        ${className ?? ""}
      `}
    >
      <ArrowLeft size={16} />
      <span>{children}</span>
    </Link>
  );
};
