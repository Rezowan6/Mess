import { Button } from "@/shared/components/ui/Button";

import type {
    IMealPlanningResponse,
    MealType,
} from "../types/mealPlanning.types";

interface Props {
  activeMeal: MealType;
  planning?: IMealPlanningResponse["data"];
  onChange: (meal: MealType) => void;
}

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

export const MealPlanningTabs = ({ activeMeal, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-base-300 pb-3">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant={activeMeal === tab.key ? "primary" : "normal"}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
