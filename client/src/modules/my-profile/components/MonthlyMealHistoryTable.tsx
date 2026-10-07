import { useMemo } from "react";

import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IMealEntry } from "@/modules/meal-entry/types/mealEntry.types";
import { useMonthlyMealHistoryColumns } from "../configs/monthlyMealHistory.columns";
import { MONTHLY_MEAL_HISTORY_MESSAGES } from "../configs/monthlyMealHistory.messages";
import { MyMealHistorySkeleton } from "./skeleton/MyMealHistorySkeleton";

interface Props {
  meals: IMealEntry[];
  totalMeal: number;
  isPending: boolean;
}

const PAGE_LIMIT = 10;

export const MonthlyMealHistoryTable = ({
  meals,
  totalMeal,
  isPending,
}: Props) => {
  const { page, search, handleSearch, handlePage } =
    useTableSearchParams();

  const columns = useMonthlyMealHistoryColumns();

  const filteredMeals = useMemo(() => {
    if (!search) return meals;

    const normalizedSearch = search.toLowerCase();

    return meals.filter((meal) =>
      meal.date.toLowerCase().includes(normalizedSearch),
    );
  }, [meals, search]);

  const totalPages = Math.ceil(filteredMeals.length / PAGE_LIMIT);

  const paginatedMeals = useMemo(() => {
    const startIndex = (page - 1) * PAGE_LIMIT;

    return filteredMeals.slice(
      startIndex,
      startIndex + PAGE_LIMIT,
    );
  }, [filteredMeals, page]);

  const meta =
    filteredMeals.length > 0
      ? {
          page,
          limit: PAGE_LIMIT,
          total: filteredMeals.length,
          totalPages,
        }
      : undefined;

  return (
    <DataTableSection
      columns={columns}
      data={paginatedMeals}
      meta={meta}
      isPending={isPending}
      isError={false}
      refetch={() => {}}
      message={MONTHLY_MEAL_HISTORY_MESSAGES}
      skeleton={<MyMealHistorySkeleton />}
      search={search}
      onSearch={handleSearch}
      onPageChange={handlePage}
      summary={{
        label: "Total Meal",
        amount: totalMeal,
        prefix: "",
        className: "text-success",
      }}
    />
  );
};