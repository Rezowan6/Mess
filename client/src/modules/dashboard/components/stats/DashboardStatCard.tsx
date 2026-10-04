import { useNavigate } from "react-router-dom";

import { SummaryStat } from "@/shared/components/ui/SummaryStat";
import type { DashboardStat } from "./stat.config";

type Props = Omit<DashboardStat, "key" | "permission">;

export const DashboardStatCard = ({
  title,
  amount,
  prefix,
  decimals,
  tone,
  path,
}: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      aria-label={`View ${title}`}
      className="w-full cursor-pointer rounded-xl text-left transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info/50"
    >
      <SummaryStat
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