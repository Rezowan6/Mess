import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { Button } from "@/shared/components/ui/Button";
import { mealPlanningColumns } from "../configs/mealPlanning.columns";
import type { IMealPlanningResponse } from "../types/mealPlanning.types";

interface Props {
  planning?: IMealPlanningResponse["data"];
  loading?: boolean;
  error?: boolean;
  refetch?: () => void;
}

type MealType = "breakfast" | "lunch" | "dinner";

export const MealPlanningTabs = ({
  planning,
  loading = false,
  error = false,
  refetch,
}: Props) => {
  const [activeMeal, setActiveMeal] = useState<MealType>("breakfast");

  const tabs: { key: MealType; label: string }[] = [
    {
      key: "breakfast",
      label: "Breakfast",
    },
    {
      key: "lunch",
      label: "Lunch",
    },
    {
      key: "dinner",
      label: "Dinner",
    },
  ];

  const members = planning?.[activeMeal] ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b border-base-300 pb-3">
        {tabs.map((tab) => (
          <Button variant={`${activeMeal === tab.key ? "primary" : "normal"}`} key={tab.key} onClick={() => setActiveMeal(tab.key)}>
            {tab.label}
            <span className="ml-2 opacity-70">
              {planning?.[tab.key]?.length ?? 0}
            </span>
          </Button>
        ))}
      </div>

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
