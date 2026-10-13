import { useLocation } from "react-router-dom";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Table } from "@/shared/components/ui/Table";

import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { MealEntryHistorySkeleton } from "../components/skeleton/MealEntryHistorySkeleton";
import { MEAL_ENTRY_MESSAGES } from "../configs/meal.entries.message";
import { useMealHistoryColumns } from "../configs/meal.history.columns";
import { useAllMembersMeal } from "../hooks/useAllMembersMeal";
import { useState } from "react";
import type { IMealEntry } from "../types/mealEntry.types";
import { AddMealEntryModal } from "../components/AddMealEntryModal";

export const MealHistoryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<IMealEntry | null>(null);
  const location = useLocation();

  const { data, isPending } = useAllMembersMeal();

  const handleEdit = (meal: IMealEntry) => {
    setSelectedMeal(meal);
    setIsEditOpen(true);
  };

  const columns = useMealHistoryColumns(handleEdit);

  const userId = location.state?.userId;

  if (isPending) {
    return <MealEntryHistorySkeleton />;
  }

  if (!data) {
    const { title, description } = MEAL_ENTRY_MESSAGES.empty;
    return (
      <EmptyState
        title={title}
        description={description}
      />
    );
  }

  const memberMeals = data.data.filter((item) => item.userId === userId);

  const name = memberMeals[0]?.user?.name;
  const avatar = memberMeals[0]?.user?.avatar;

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
      <MemberHeader
        name={name}
        avatar={avatar}
        subtitle="Meal History"
        rightContent={
          <div className="text-right">
            <p className="text-xs text-base-content/60">Total Meals</p>
            <p className="font-bold">{totalMeals}</p>
          </div>
        }
      />

      <Table
        columns={columns}
        data={memberMeals}
        loading={isPending}
        message={MEAL_ENTRY_MESSAGES}
      />


      <AddMealEntryModal isOpen={isEditOpen} onClose={()=> {
        setIsEditOpen(false);
        setSelectedMeal(null);
      }} meal={selectedMeal ?? undefined}
      />

    </>
  );
};
