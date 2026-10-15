import type { TableColumn } from "@/shared/components/ui/Table";

import { Badge } from "@/shared/components/ui/Badge";
import { MealPlanningActions } from "../components/MealPlanningActions";
import { MealPlanningTableHeader } from "../components/MealPlanningTableHeader";
import type {
  IMealPlanningMember,
  IMealType,
} from "../types/mealPlanning.types";

export const getMealPlanningColumns = (
  activeMeal: IMealType,
): TableColumn<IMealPlanningMember>[] => [
  {
    key: "member",
    title: "Member",
    render: (row) => <MealPlanningTableHeader request={row} />,
  },
  {
    key: "meal",
    title: "Meal",
    render: (row) => (
      <Badge size="sm" variant="soft-success">
        {row.meal}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    className: "w-32",
    render: (row) => <MealPlanningActions member={row} meal={activeMeal} />,
  },
];