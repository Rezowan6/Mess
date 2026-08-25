import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Avatar } from "@/shared/components/ui/Avatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import type { IMealEntry } from "../types/mealEntry.types";

export const useMembersMealSummaryColumns = (): TableColumn<IMealEntry>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IMealEntry>[] = [
    {
      key: "member",
      title: "Member",
      render: (meal) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              fallback={getAvatarInitial(
                meal?.user?.name ?? "",
                meal?.user?.avatar,
              )}
            />

            <span className="font-medium">{meal?.user?.name ?? ""}</span>
          </div>
        );
      },
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
