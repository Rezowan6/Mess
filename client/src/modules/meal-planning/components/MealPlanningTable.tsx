import { CalendarDays, Users, Utensils } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/shared/components/ui/Badge";
import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { Tabs } from "@/shared/components/ui/Tabs";
import { formatDate } from "@/shared/utils/date.utils";
import { mealTabs } from "../configs/meal.tabs.config";
import { getMealPlanningColumns } from "../configs/mealPlanning.columns";
import { useMealPlanningTable } from "../hooks/useMealPlanningTable";
import { useRejectMeal } from "../hooks/useRejectMeal";
import type {
  IMealPlanningResponse,
  IMealType,
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
  const [activeMeal, setActiveMeal] = useState<IMealType>("breakfast");
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

  const handleReject = (userId: number) => {
    setPendingUserId(userId);

    rejectMeal(
      { userId, meal: activeMeal },
      { onSettled: () => setPendingUserId(null) },
    );
  };

  const columns = getMealPlanningColumns(
    handleReject,
    isPending,
    pendingUserId,
  );

  const activeMembers = planning?.[activeMeal] ?? [];
  const memberCount = activeMembers.length;

  // Today's date is the same for every meal, so any meal can provide it
  const planningDate =
    planning?.breakfast?.[0]?.date ??
    planning?.lunch?.[0]?.date ??
    planning?.dinner?.[0]?.date;

  // Show how many members each meal has
  const tabs = mealTabs.map((tab) => ({
    ...tab,
    label: loading
      ? tab.label
      : `${tab.label} (${planning?.[tab.key]?.length ?? 0})`,
  }));

  return (
    <div className="space-y-4">
      {/* Tabs + meal info */}
      <div>
        <Tabs tabs={tabs} activeTab={activeMeal} onChange={setActiveMeal} />

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="soft-info"
            size="sm"
            leftIcon={<Utensils />}
            className="min-w-28"
          >
            {activeMeal}
          </Badge>

          <Badge
            variant="soft-success"
            size="sm"
            leftIcon={<CalendarDays />}
            className="min-w-32 tabular-nums"
          >
            {!loading && planningDate ? formatDate(planningDate) : "—"}
          </Badge>

          <Badge
            variant="soft-secondary"
            size="sm"
            leftIcon={<Users />}
            className="min-w-28 tabular-nums"
          >
            {loading
              ? "—"
              : `${memberCount} ${memberCount === 1 ? "member" : "members"}`}
          </Badge>
        </div>
      </div>

      {/* Search stays visible, so typing never loses focus */}
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="by member name"
      />

      {/* Fixed minimum height stops the page from jumping between tabs */}
      <div className="min-h-[30em]">
        <Table
          columns={columns}
          data={paginatedMembers}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </div>

      {!loading && !error && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
      )}
    </div>
  );
};
