import { Coffee, Moon, Sun } from "lucide-react";

interface Props {
  summary: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };
}

export const MyProfileMealBreakdown = ({ summary }: Props) => {
  const meals = [
    {
      label: "Breakfast",
      value: summary.breakfast,
      icon: Coffee,
    },
    {
      label: "Lunch",
      value: summary.lunch,
      icon: Sun,
    },
    {
      label: "Dinner",
      value: summary.dinner,
      icon: Moon,
    },
  ];

  return (
    <div className="rounded-2xl bg-background p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold">Meal Breakdown</h3>
        <p className="text-sm opacity-60">Your meal consumption this month</p>
      </div>

      <div className="space-y-4">
        {meals.map((meal) => {
          const Icon = meal.icon;

          return (
            <div
              key={meal.label}
              className="flex items-center justify-between rounded-xl bg-info/10 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-info">
                  <Icon size={18} />
                </div>

                <span className="text-sm font-medium">{meal.label}</span>
              </div>

              <span className="font-bold">+{meal.value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-info pt-4">
        <span className="font-medium">Total Meals</span>
        <span className="text-lg font-bold text-info">{summary.total}</span>
      </div>
    </div>
  );
};
