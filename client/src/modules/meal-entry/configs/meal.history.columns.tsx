import type { TableColumn } from "@/shared/components/ui/Table";

import type { IMealEntry } from "../types/mealEntry.types";

export const useMealHistoryColumns = (): TableColumn<IMealEntry>[] => {
  const columns: TableColumn<IMealEntry>[] = [
    {
      key: "date",
      title: "Date",
      render: (meal) => new Date(meal.date).toLocaleDateString(),
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
      key: "guestMeal",
      title: "Guest Meal",
      render: (meal) => meal.guestMeal,
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

  return columns;
};
