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
      <div className="rounded-xl bg-info/10 p-3 text-primary">
        <Icon size={22} className={`text-info ${iconClassName}`} />
      </div>

      <div>
        <h4 className="font-semibold text-success">{title}</h4>

        <p className="text-sm text-base-content/70">{value}</p>
      </div>
    </div>
  );
};
