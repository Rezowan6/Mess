import { Table } from "@/shared/components/ui/Table";

import { getLocalDate } from "@/shared/utils/date.utils";
import { TodayMealEntryInfoCard } from "../components/TodayMealEntryInfoCard";
import { TodayMealEntrySummarySkeleton } from "../components/TodayMealEntrySummarySkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useTodayMealEntryColumns } from "../configs/todayMealEntry.columns";
import { useTodayMealEntries } from "../hooks";

export const TodayMealEntriesPage = () => {
  const columns = useTodayMealEntryColumns();

  const today = getLocalDate();

  const { data, isPending, refetch } = useTodayMealEntries({
    date: today,
  });

  const entries = data?.data ?? [];
  const createdAt = entries[0]?.createdAt;

  const summary = entries.reduce(
    (acc, item) => {
      acc.breakfast += Number(item.breakfast);
      acc.lunch += Number(item.lunch);
      acc.dinner += Number(item.dinner);
      acc.guest += Number(item.guestMeal);

      acc.totalMeal = acc.breakfast + acc.lunch + acc.dinner + acc.guest;

      return acc;
    },
    {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      guest: 0,
      totalMeal: 0,
    },
  );

  if (isPending) {
    return <TodayMealEntrySummarySkeleton />;
  }

  return (
    <>
      {createdAt && (
        <p className="text-xs sm:text-sm ">
           Created At:{" "}
          <span className="text-info">{createdAt.split("T")[0]}</span>
        </p>
      )}
      {/* Summary card */}
      <TodayMealEntryInfoCard summary={summary} memberCount={entries.length} />
      {/* Table */}
      <Table
        columns={columns}
        data={entries}
        loading={isPending}
        error={false}
        refetch={refetch}
        message={MEAL_ENTRY_MESSAGES}
      />
    </>
  );
};
