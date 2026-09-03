import { useNavigate } from "react-router-dom";

import { InfoCard } from "@/shared/components/ui/InfoCard";
import type { DashboardStat } from "./stat.config";

interface Props extends DashboardStat {}

export const DashboardStatCard = ({
  title,
  value,
  description,
  icon: Icon,
  path,
}: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="group w-full cursor-pointer text-left"
      aria-label={`View ${title}`}
    >
      <InfoCard
        title={title}
        value={value}
        description={description}
        icon={<Icon size={22} strokeWidth={2} />}
        iconClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info transition-all duration-300 group-hover:scale-105 group-hover:bg-info group-hover:text-info-content"
        valueClassName="mt-1 text-2xl font-bold tracking-tight"
        className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-success group-hover:shadow-lg group-active:scale-[0.98]"
      />
    </button>
  );
};
