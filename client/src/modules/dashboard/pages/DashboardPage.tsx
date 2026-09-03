import {
  MealTrendChart,
} from "../components/charts/MealTrendChart";
import { DashboardHeader } from "../components/header/DashboardHeader";
import { DashboardStats } from "../components/stats/DashboardStats";
import { DashboardLayout } from "../layout/DashboardLayout";

// const mealTrendData: any[] = [
//   { date: "01 Aug", meals: 18 },
//   { date: "05 Aug", meals: 24 },
//   { date: "10 Aug", meals: 21 },
//   { date: "15 Aug", meals: 32 },
//   { date: "20 Aug", meals: 28 },
//   { date: "25 Aug", meals: 38 },
//   { date: "30 Aug", meals: 35 },
// ];

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
