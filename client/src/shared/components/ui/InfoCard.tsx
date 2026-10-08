import clsx from "clsx";
import type { ReactNode } from "react";
import { CARD_STYLES } from "../configs/card.styles";

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
    <div className={clsx(CARD_STYLES.base, "p-2 overflow-hidden", className)}>
      <div className={CARD_STYLES.glow} />
      <div className={CARD_STYLES.overlay} />
      <div className="relative flex items-center gap-4">
        {icon && (
          <div
            className={clsx(
              CARD_STYLES.icon,
              "h-12 w-12 shrink-0",
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
      <div className={CARD_STYLES.bottomGradient} />
    </div>
  );
};
