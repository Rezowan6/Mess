import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CounterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  position: "left" | "right";
}

export function CounterButton({
  children,
  position,
  className,
  ...props
}: CounterButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-7 w-7 items-center justify-center border transition",
        "disabled:cursor-not-allowed disabled:opacity-40",
        position === "left" && [
          "rounded-l-theme-sm border-theme-danger text-theme-danger",
          "hover:bg-theme-danger-soft",
        ],
        position === "right" && [
          "rounded-r-theme-sm border-theme-success text-theme-success",
          "hover:bg-theme-info-soft",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
