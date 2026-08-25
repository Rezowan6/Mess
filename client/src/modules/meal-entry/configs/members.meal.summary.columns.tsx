import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import type { IMealEntry } from "../types/mealEntry.types";

export const useMembersMealSummaryColumns = (): TableColumn<IMealEntry>[] => {
  const { can } = useRBAC();

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
      key: "guestMeal",
      title: "Guest",
      render: (meal) => meal.totalGuestMeal,
    },
    {
      key: "totalMeals",
      title: "Total Meals",
      render: (meal) => meal.totalMeals,
    },
    {
      key: "grandTotalMeals",
      title: "Grand Total",
      render: (meal) => meal.grandTotalMeals,
    },
  ];

  if (can(PERMISSIONS.MEAL_ENTRY_CREATE)) {
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
