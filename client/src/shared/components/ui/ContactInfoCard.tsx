import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  className?: string;
  iconClassName?: string;
}

export const ContactInfoCard = ({
  icon: Icon,
  title,
  value,
  className,
  iconClassName,
}: ContactInfoCardProps) => {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      <Icon
        size={22}
        className={clsx("shrink-0 text-theme-info", iconClassName)}
      />

      <div>
        <h4 className="font-semibold text-theme-text">{title}</h4>

        <p className="text-sm text-theme-text-muted">{value}</p>
      </div>
    </div>
  );
};
