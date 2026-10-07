import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { ROUTES } from "@/shared/constants/routes";
import type { IMealEntry } from "../types/mealEntry.types";
import { useMealEntryTablePermissions } from "./mealEntry.columns.permission";

export const useMembersMealSummaryColumns = (): TableColumn<IMealEntry>[] => {
  const { canViewDetails } = useMealEntryTablePermissions();

  const columns: TableColumn<IMealEntry>[] = [
    {
      key: "member",
      title: "Member",
      render: (meal) => (
        <MemberAvatar name={meal.user?.name} avatar={meal.user?.avatar} />
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

  if (canViewDetails) {
    columns.push({
      key: "details",
      title: "Details",
      render: (meal) => (
        <ActionLink state={meal} to={`${ROUTES.MEAL_ENTRY}/history`}>
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};
