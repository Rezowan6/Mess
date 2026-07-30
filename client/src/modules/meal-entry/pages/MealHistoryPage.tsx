import { useLocation } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { BackButton } from "@/shared/components/ui/BackButton";
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Meal History</h2>

          <p className="text-sm opacity-70">View all meals for this member.</p>
        </div>

        <BackButton to={ROUTES.MEAL_ENTRY} />
      </div>

      <MealEntryInfoCard memberName={member?.name ?? ""} totalMeals={totalMeals} />

      <Table
        columns={columns}
        data={memberMeals}
        loading={isPending}
        message={MEAL_ENTRY_MESSAGES}
      />
    </div>
  );
};
