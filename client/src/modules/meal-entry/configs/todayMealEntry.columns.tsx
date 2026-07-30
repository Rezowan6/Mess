import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITodayMealEntry } from "../types/mealEntry.types";

export const useTodayMealEntryColumns = (): TableColumn<ITodayMealEntry>[] => {
  const columns: TableColumn<ITodayMealEntry>[] = [
    {
      key: "user",
      title: "Member",
      render: (row) => row?.user?.name,
    },

    {
      key: "breakfast",
      title: "Breakfast",
      render: (row) => row.breakfast,
    },

    {
      key: "lunch",
      title: "Lunch",
      render: (row) => row.lunch,
    },

    {
      key: "dinner",
      title: "Dinner",
      render: (row) => row.dinner,
    },

    {
      key: "guestMeal",
      title: "Guest",
      render: (row) => row.guestMeal,
    },

    {
      key: "total",
      title: "Total",
      render: (row) =>
        Number(row.breakfast) +
        Number(row.lunch) +
        Number(row.dinner) +
        Number(row.guestMeal),
    },
  ];

  return columns;
};
