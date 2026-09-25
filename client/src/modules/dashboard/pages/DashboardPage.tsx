import { MealTrendChart } from "../components/charts/MealTrendChart";
import { DashboardHeader } from "../components/header/DashboardHeader";
import { DashboardStats } from "../components/stats/DashboardStats";
import { DashboardLayout } from "../layout/DashboardLayout";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardStats />

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <TodaysMeals />
        <PendingActions />
      </div> */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MealTrendChart />
        {/* <ExpenseTrendChart /> */}
      </div>

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentExpenses />
        <RecentActivity />
      </div> */}
    </DashboardLayout>
  );
};
