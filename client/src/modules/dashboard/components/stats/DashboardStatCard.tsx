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
        
      />
    </button>
  );
};
