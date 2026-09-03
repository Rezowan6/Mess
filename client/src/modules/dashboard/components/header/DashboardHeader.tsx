import { DashboardMonthSelector } from "./DashboardMonthSelector";
import { DashboardWelcome } from "./DashboardWelcome";
import { MealSessionStatus } from "./MealSessionStatus";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <DashboardWelcome />

      <div className="flex items-center gap-3">
        <DashboardMonthSelector />
        <MealSessionStatus />
      </div>
    </div>
  );
};
