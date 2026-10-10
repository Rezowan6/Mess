import { MealSessionSelector } from "./MealSessionSelector";
import { MealSessionStatus } from "./MealSessionStatus";

export const DashboardSessionBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1 sm:flex-none">
        <MealSessionSelector />
      </div>

      <MealSessionStatus />
    </div>
  );
};
