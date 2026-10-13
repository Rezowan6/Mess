import type { TableColumn } from "@/shared/components/ui/Table";

import type { IMealEntry } from "../types/mealEntry.types";
import { useExpenseTablePermissions } from "@/modules/expense/configs/expense.columns.permission";
import { MealEntryActions } from "../components/MealEntryActions";
import { formatDate } from "@/shared/utils/date.utils";

export const useMealHistoryColumns = (onEdit: (meal: IMealEntry) => void,): TableColumn<IMealEntry>[] => {
  const {canViewDetails} = useExpenseTablePermissions();
  
  const columns: TableColumn<IMealEntry>[] = [
    {
      key: "date",
      title: "Date",
      render: (meal) => formatDate(meal.date),
    },

    {
      key: "breakfast",
      title: "Breakfast",
      render: (meal) => meal.breakfast,
    },

    {
      key: "lunch",
      title: "Lunch",
      render: (meal) => meal.lunch,
    },

    {
      key: "dinner",
      title: "Dinner",
      render: (meal) => meal.dinner,
    },

    {
      key: "total",
      title: "Total Meal",
      render: (meal) =>
        Number(meal.breakfast) +
        Number(meal.lunch) +
        Number(meal.dinner) +
        Number(meal.guestMeal),
    },
  ];

  if(canViewDetails) {
    columns.push({
      key: "actions",
      title: "Actions",
      render: (meal) => <MealEntryActions meal={meal} onEdit={onEdit} />,
    })
  }

  return columns;
};
