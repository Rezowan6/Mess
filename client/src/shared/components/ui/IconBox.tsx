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
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
};

export const IconBox = ({
  icon,
  size = "md",
  bgClassName = "bg-primary/10",
  textClassName = "text-primary",
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
