import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  title?: ReactNode;
  value?: ReactNode;
  icon?: ReactNode;
  description?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
}

export const InfoCard = ({
  title,
  value,
  icon,
  description,
  className,
  iconClassName,
  valueClassName,
}: Props) => {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-2xl p-2",
        "border border-white/15 bg-white/5 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-white/25",
        "hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {/* Glass Glow */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-12 -top-12 h-32 w-32",
          "rounded-full bg-info/20 blur-3xl",
          "transition-all duration-700",
          "group-hover:scale-150 group-hover:bg-success/20",
        )}
      />

      {/* Soft Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-info/5" />

      <div className="relative flex items-center gap-4">
        {icon && (
          <div
            className={clsx(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
              "border border-white/15",
              "bg-linear-to-br from-white/15 to-white/5",
              "backdrop-blur-md",
              "text-info shadow-inner",
              "transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-2",
              "group-hover:text-success",
              iconClassName,
            )}
          >
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-base-content/50">
            {title}
          </p>

          <h3
            className={clsx(
              "mt-1 text-xl font-bold tracking-tight text-base-content",
              "transition-all duration-300",
              "group-hover:text-info",
              valueClassName,
            )}
          >
            {value}
          </h3>

          {description && (
            <p className="mt-1.5 text-sm leading-5 text-base-content/60">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Animated Bottom Gradient */}
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2",
          "bg-linear-to-r from-transparent via-info to-transparent",
          "transition-all duration-700",
          "group-hover:w-3/4",
        )}
      />
    </div>
  );
};