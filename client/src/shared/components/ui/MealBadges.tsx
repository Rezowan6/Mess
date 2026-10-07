// features/mealRequest/components/shared/MealBadges.tsx
import type { IMyPendingMealReq } from "@/modules/meal-request/types/mealRequest.types";
import { Badge } from "@/shared/components/ui/Badge";

const MEAL_BADGES = [
  { key: "breakfast", label: "Breakfast", variant: "soft-success" },
  { key: "lunch", label: "Lunch", variant: "soft-info" },
  { key: "dinner", label: "Dinner", variant: "soft-secondary" },
] as const;

interface MealBadgesProps {
  meals: Pick<IMyPendingMealReq, "breakfast" | "lunch" | "dinner">;
  className?: string;
}

export const MealBadges = ({
  meals,
  className = "flex flex-wrap items-center gap-2",
}: MealBadgesProps) => (
  <div className={className}>
    {MEAL_BADGES.map(({ key, label, variant }) => (
      <Badge key={key} variant={variant} size="sm">
        {label}: {meals[key]}
      </Badge>
    ))}
  </div>
);