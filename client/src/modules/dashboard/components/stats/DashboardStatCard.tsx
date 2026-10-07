import { useNavigate } from "react-router-dom";

import { SummaryStat } from "@/shared/components/ui/SummaryStat";
import type { DashboardStat } from "./stat.config";

interface Props {
  stat: DashboardStat;
}

export const DashboardStatCard = ({ stat }: Props) => {
  const navigate = useNavigate();

  const { title, amount, prefix, decimals, tone, path } = stat;

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      aria-label={`View ${title}`}
      className="block h-full w-full min-w-0 cursor-pointer rounded-theme-xl text-left transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none"
    >
      <SummaryStat
        layout="stacked"
        label={title}
        amount={amount}
        prefix={prefix}
        decimals={decimals}
        tone={tone}
        className="h-full"
      />
    </button>
  );
};