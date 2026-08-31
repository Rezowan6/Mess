import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Tabs } from "@/shared/components/ui/Tabs";
import { mealTabs } from "../configs/meal.tabs.config";
import { getMealPlanningColumns } from "../configs/mealPlanning.columns";
import { useMealPlanningTable } from "../hooks/useMealPlanningTable";
import { useRejectMeal } from "../hooks/useRejectMeal";
import type {
  IMealPlanningResponse,
  MealType,
} from "../types/mealPlanning.types";

interface Props {
  planning?: IMealPlanningResponse["data"];
  loading?: boolean;
  error?: boolean;
  refetch?: () => void;
}

export const MealPlanningTable = ({
  planning,
  loading = false,
  error = false,
  refetch,
}: Props) => {
  const [activeMeal, setActiveMeal] = useState<MealType>("breakfast");
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);

  const { mutate: rejectMeal, isPending } = useRejectMeal();

  const {
    search,
    page,
    totalPages,
    paginatedMembers,
    handleSearch,
    handlePage,
  } = useMealPlanningTable({
    planning,
    activeMeal,
  });

  const columns = getMealPlanningColumns(
    (userId) => {
      setPendingUserId(userId);

      rejectMeal(
        {
          userId,
          meal: activeMeal,
        },
        {
          onSettled: () => {
            setPendingUserId(null);
          },
        },
      );
    },
    isPending,
    pendingUserId,
  );

  const members = (planning?.[activeMeal] ?? []).filter((member) =>
    member.memberName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Tabs — fixed */}
      <div>
        <Tabs tabs={mealTabs} activeTab={activeMeal} onChange={setActiveMeal} />
        <p className="w-fit text-left text-sm text-info -mt-2">{activeMeal}</p>
      </div>
      {/* Search — fixed */}
      <SearchInput value={search} onChange={handleSearch} />

      {/* Only this area changes */}
      <div className="min-h-[30em] transition-all duration-200">
        <Table
          columns={columns}
          data={paginatedMembers}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </div>

      {/* Pagination */}
      {!loading && !error && members.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
      )}
    </div>
  );
};
