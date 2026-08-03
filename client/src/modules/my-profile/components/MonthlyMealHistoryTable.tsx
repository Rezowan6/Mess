import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useMonthlyMealHistoryColumns } from "../configs/monthlyMealHistory.columns";
import { MONTHLY_MEAL_HISTORY_MESSAGES } from "../configs/monthlyMealHistory.messages";

interface IMealHistory {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  guestMeal: string;
}

interface Props {
  meals: IMealHistory[];
}

export const MonthlyMealHistoryTable = ({ meals }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  const columns = useMonthlyMealHistoryColumns();

  const filteredMeals = meals.filter((meal) =>
    meal.date.toLowerCase().includes(search.toLowerCase()),
  );

  const limit = 10;

  const totalPages = Math.ceil(filteredMeals.length / limit);

  const paginatedMeals = filteredMeals.slice((page - 1) * limit, page * limit);

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",
        ...(value && {
          search: value,
        }),
      },
      {
        replace: true,
      },
    );
  };

  const handlePage = (page: number) => {
    setSearchParams({
      page: String(page),
      ...(search && {
        search,
      }),
    });
  };

  useEffect(() => {
    if (page !== 1) {
      setSearchParams(
        {
          page: "1",
          ...(search && {
            search,
          }),
        },
        {
          replace: true,
        },
      );
    }
  }, []);

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      <Table
        columns={columns}
        data={paginatedMeals}
        loading={false}
        error={false}
        message={MONTHLY_MEAL_HISTORY_MESSAGES}
        refetch={() => {}}
      />

      {totalPages > 0 && (
        <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
      )}
    </div>
  );
};
