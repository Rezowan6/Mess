import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MealEntryTableSkeleton } from "../components/MealEntryTableSkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useMembersMealSummaryColumns } from "../configs/members.meal.summary.columns";
import { useMembersMealSummary } from "../hooks/useMembersMealSummary";

export const MembersMealSummaryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * URL Params
   */
  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  const { data, isPending, isError, refetch } = useMembersMealSummary({
    page,
    limit: 10,
    search,
  });
  const columns = useMembersMealSummaryColumns();

  const membersMeals = data?.data ?? [];

  const meta = data?.meta;

  /**
   * Search
   */
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

  /**
   * Pagination
   */
  const handlePage = (page: number) => {
    setSearchParams({
      page: String(page),
      ...(search && {
        search,
      }),
    });
  };

  /**
   * Reset page
   */
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

  if (isPending) {
    return <MealEntryTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <SearchInput value={search} onChange={handleSearch} />
      <Table
        columns={columns}
        data={membersMeals}
        loading={isPending}
        error={isError}
        message={MEAL_ENTRY_MESSAGES}
        refetch={refetch}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}
    </div>
  );
};
