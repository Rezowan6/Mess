import { useLocation } from "react-router-dom";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Table } from "@/shared/components/ui/Table";

import { MealEntryInfoCard } from "../components/MealEntryInfoCard";
import { MealEntryTableSkeleton } from "../components/MealEntryTableSkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useMealHistoryColumns } from "../configs/meal.history.columns";
import { useAllMembersMeal } from "../hooks/useAllMembersMeal";

export const MealHistoryPage = () => {
  const location = useLocation();

  const { data, isPending } = useAllMembersMeal();

  const columns = useMealHistoryColumns();

  const userId = location.state?.userId;

  if (isPending) {
    return <MealEntryTableSkeleton />;
  }

  if (!data) {
    return (
      <EmptyState
        title={MEAL_ENTRY_MESSAGES.empty.title}
        description={MEAL_ENTRY_MESSAGES.empty.description}
      />
    );
  }

  const memberMeals = data.data.filter((item) => item.userId === userId);

  const member = memberMeals[0]?.user;

  const totalMeals = memberMeals.reduce(
    (sum, item) =>
      sum +
      Number(item.breakfast) +
      Number(item.lunch) +
      Number(item.dinner) +
      Number(item.guestMeal),
    0,
  );

  return (
    <>
      <MealEntryInfoCard
        memberName={member?.name ?? ""}
        totalMeals={totalMeals}
      />

      <Table
        columns={columns}
        data={memberMeals}
        loading={isPending}
        message={MEAL_ENTRY_MESSAGES}
      />
    </>
  );
};
