import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import type { IMealEntry } from "../types/mealEntry.types";

export const useMembersMealSummaryColumns = (): TableColumn<IMealEntry>[] => {
  const columns: TableColumn<IMealEntry>[] = [
    {
      key: "member",
      title: "Member",
      render: (meal) => (
        <ActionLink
          state={meal}
          to={`${ROUTES.MEAL_ENTRY}/history`}
          permission={PERMISSIONS.MEAL_ENTRY_VIEW}
          onDenied="plain"
          showIcon={false}
          showHoverBorder={false}
        >
          <MemberAvatar name={meal.user?.name} avatar={meal.user?.avatar} />
        </ActionLink>
      ),
    },
    {
      key: "breakfast",
      title: "Breakfast",
      render: (meal) => meal.totalBreakfast,
    },
    {
      key: "lunch",
      title: "Lunch",
      render: (meal) => meal.totalLunch,
    },
    {
      key: "dinner",
      title: "Dinner",
      render: (meal) => meal.totalDinner,
    },
    {
      key: "totalMeals",
      title: "Total Meals",
      render: (meal) => meal.totalMeals,
    },
  ];

  return columns;
};
