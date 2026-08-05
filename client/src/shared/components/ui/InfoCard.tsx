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
        "rounded-xl border border-primary bg-transparent p-5 shadow-s transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-base-200 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <div className={iconClassName}>{icon}</div>}

        <div>
          <p className="text-xs opacity-60">{title}</p>

          <h3 className={clsx("font-semibold", valueClassName)}>{value}</h3>

          {description && (
            <p className="mt-2 text-sm leading-6 text-base-content/70">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
