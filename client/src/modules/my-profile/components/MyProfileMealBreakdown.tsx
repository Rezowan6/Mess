import { OverviewListCard } from "@/shared/components/ui/OverviewListCard";
import { myProfileMealBreakdownConfig } from "../configs/myProfileMealBreakdown.config";
import type { mealSummary } from "../types/myProfile.types";

interface Props {
  summary: mealSummary;
}

export const MyProfileMealBreakdown = ({ summary }: Props) => {
  const items = myProfileMealBreakdownConfig(summary);

  return (
    <OverviewListCard
      title="Meal Breakdown"
      description="Your meal consumption this month"
      items={items}
      totalLabel="Total Meals"
      totalValue={summary.total}
    />
  );
};
