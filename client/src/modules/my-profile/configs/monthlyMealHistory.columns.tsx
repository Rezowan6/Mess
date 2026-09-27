import type { TableColumn } from "@/shared/components/ui/Table";
import { formatDate } from "@/shared/utils/date.utils";

interface IMonthlyMealHistory {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  guestMeal: string;
}

export const useMonthlyMealHistoryColumns =
  (): TableColumn<IMonthlyMealHistory>[] => {
    const columns: TableColumn<IMonthlyMealHistory>[] = [
      {
        key: "date",
        title: "Date",
        render: (row) => formatDate(row.date),
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
