import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

export const BackButton = ({
  to,
  children = "Back",
  className,
}: Props) => {
  return (
    <Link
      to={to}
      className={clsx(
        "inline-flex w-full sm:w-auto items-center justify-center gap-2",
        "rounded-md px-4 py-2",
        "bg-gradient-accent",
        "text-white font-medium",
        "transition-all duration-300 hover:scale-105",
        className,
      )}
    >
      <ArrowLeft size={16} />
      <span>{children}</span>
    </Link>
  );
};