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
          "rounded-l-md border-error/40 bg-error/10 text-error",
          "hover:bg-error hover:text-error-content",
        ],
        position === "right" && [
          "rounded-r-md border-accent/40 bg-accent/10 text-accent",
          "hover:bg-accent hover:text-accent-content",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
