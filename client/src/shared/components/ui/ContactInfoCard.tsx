import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface Props {
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
}: Props) => {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      <div className="rounded-xl bg-theme-info/10 p-3 text-theme-brand">
        <Icon size={22} className={`text-info ${iconClassName}`} />
      </div>

      <div>
        <h4 className="font-semibold text-theme-success">{title}</h4>

        <p className="text-sm text-theme-text-muted">{value}</p>
      </div>
    </div>
  );
};
