import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import { MealEntryTableSkeleton } from "../components/MealEntryTableSkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useMembersMealSummaryColumns } from "../configs/members.meal.summary.columns";
import { useMembersMealSummary } from "../hooks/useMembersMealSummary";

export const MembersMealSummaryPage = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useMembersMealSummary({
    page,
    limit: 10,
    search,
  });
  const columns = useMembersMealSummaryColumns();

  const membersMeals = data?.data ?? [];

  const meta = data?.meta;

  if (isPending) {
    return <MealEntryTableSkeleton />;
  }

  return (
    <>
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
    </>
  );
};
