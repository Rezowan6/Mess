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
        "group relative overflow-hidden rounded-theme-xl p-2",
        "border border-theme-border bg-theme-card backdrop-blur-xl",
        "shadow-theme-md",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-theme-border-hover",
        "hover:bg-theme-card-hover hover:shadow-theme-lg",
        className,
      )}
    >
      {/* Glass Glow */}
      <div
        className={clsx(
          "pointer-events-none absolute -right-12 -top-12 h-32 w-32",
          "rounded-full bg-theme-info-soft blur-3xl",
          "transition-all duration-700",
          "group-hover:scale-150 group-hover:bg-theme-success-soft",
        )}
      />

      {/* Soft Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-theme-surface-hover via-transparent to-theme-info-soft" />

      <div className="relative flex items-center gap-4">
        {icon && (
          <div
            className={clsx(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-theme-lg",
              "border border-theme-border",
              "bg-linear-to-br from-theme-surface-raised to-theme-surface-sunken",
              "backdrop-blur-md",
              "text-theme-info shadow-inner",
              "transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-2",
              "group-hover:text-theme-success",
              iconClassName,
            )}
          >
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-theme-text-muted">
            {title}
          </p>

          <h3
            className={clsx(
              "mt-1 text-xl font-bold tracking-tight text-theme-text",
              "transition-all duration-300",
              "group-hover:text-theme-info",
              valueClassName,
            )}
          >
            {value}
          </h3>

          {description && (
            <p className="mt-1.5 text-sm leading-5 text-theme-text-muted">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Animated Bottom Gradient */}
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2",
          "bg-linear-to-r from-transparent via-theme-info to-transparent",
          "transition-all duration-700",
          "group-hover:w-3/4",
        )}
      />
    </div>
  );
};
