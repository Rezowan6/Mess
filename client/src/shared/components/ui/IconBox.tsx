import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;

  size?: "sm" | "md" | "lg";

  bgClassName?: string;
  textClassName?: string;

  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 rounded-full",
  md: "h-12 w-12 rounded-full",
  lg: "h-16 w-16 rounded-full",
};

export const IconBox = ({
  icon,
  size = "md",
  bgClassName = "bg-theme-info/10",
  textClassName = "text-theme-info",
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        sizeClasses[size],
        bgClassName,
        textClassName,
        className,
      )}
    >
      {icon}
    </div>
  );
};
