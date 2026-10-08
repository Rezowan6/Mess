import clsx from "clsx";
import type { ReactNode } from "react";
import { CARD_STYLES } from "../configs/card.styles";
import { Badge } from "./Badge";

interface StepCardProps {
  stepNumber?: number;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const StepCard = ({
  stepNumber,
  icon,
  title,
  description,
}: StepCardProps) => {
  return (
    <div className={clsx(CARD_STYLES.base, "p-6 text-center")}>
      {/* Glow and overlay (clipped inside the card) */}
      <div className="pointer-events-none absolute inset-0 rounded-theme-xl">
        <div className={CARD_STYLES.glow} />
        <div className={CARD_STYLES.overlay} />
        <div className={CARD_STYLES.bottomGradient} />
      </div>

      {stepNumber !== undefined && (
        <Badge
          variant="success"
          className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full"
        >
          {stepNumber}
        </Badge>
      )}

      <div className="relative">
        <div className={clsx(CARD_STYLES.icon, "mx-auto mb-5 mt-4 size-14")}>
          {icon}
        </div>

        <h3
          className={clsx(
            "mb-3 text-lg font-semibold text-theme-text",
            "transition-colors duration-300",
            "group-hover:text-theme-info",
          )}
        >
          {title}
        </h3>

        <p className="text-sm leading-6 text-theme-text-muted">{description}</p>
      </div>
    </div>
  );
};
