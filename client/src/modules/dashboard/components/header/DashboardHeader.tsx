import { DashboardWelcome } from "./DashboardWelcome";
import { MealSessionSelector } from "./MealSessionSelector";
import { MealSessionStatus } from "./MealSessionStatus";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <DashboardWelcome />

      <div className="flex items-center gap-3">
        <MealSessionSelector />
        <MealSessionStatus />
      </div>
    </div>
  );
};
