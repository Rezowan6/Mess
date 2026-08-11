import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { mealPlanningColumns } from "../configs/mealPlanning.columns";
import type {
  IMealPlanningResponse,
  MealType,
} from "../types/mealPlanning.types";
import { MealPlanningTabs } from "./MealPlanningTabs";

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

  const members = planning?.[activeMeal] ?? [];

  return (
    <div className="space-y-4">
      <MealPlanningTabs
        activeMeal={activeMeal}
        planning={planning}
        onChange={setActiveMeal}
      />

      <Table
        columns={mealPlanningColumns}
        data={members}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};
