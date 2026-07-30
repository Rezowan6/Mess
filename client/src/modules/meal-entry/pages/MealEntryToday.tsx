import { Table } from "@/shared/components/ui/Table";

import { TodayMealEntryInfoCard } from "../components/TodayMealEntryInfoCard";
import { TodayMealEntrySummarySkeleton } from "../components/TodayMealEntrySummarySkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useTodayMealEntryColumns } from "../configs/todayMealEntry.columns";
import { useTodayMealEntries } from "../hooks";

export const TodayMealEntries = () => {
  const columns = useTodayMealEntryColumns();

  const today = new Date().toISOString().split("T")[0];

  const { data, isPending, refetch } = useTodayMealEntries({
    date: today,
  });

  const entries = data?.data ?? [];

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
    <div className="space-y-6">
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
    </div>
  );
};
