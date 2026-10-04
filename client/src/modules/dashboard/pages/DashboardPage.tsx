import { lazy, Suspense } from "react";

import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { DashboardHeader } from "../components/header/DashboardHeader";
import { DashboardStats } from "../components/stats/DashboardStats";
import { DashboardLayout } from "../layout/DashboardLayout";

// Charts are heavy, so they are loaded only when the dashboard opens
const MealTrendChart = lazy(() =>
  import("../components/charts/MealTrendChart").then((module) => ({
    default: module.MealTrendChart,
  })),
);

// TODO: implement, then enable
// const ExpenseTrendChart = lazy(() =>
//   import("../components/charts/ExpenseTrendChart").then((module) => ({
//     default: module.ExpenseTrendChart,
//   })),
// );
// import { TodaysMeals } from "../components/today/TodaysMeals";
// import { PendingActions } from "../components/actions/PendingActions";
// import { RecentExpenses } from "../components/recent/RecentExpenses";
// import { RecentActivity } from "../components/recent/RecentActivity";

// Fixed height, so the page does not jump when the chart arrives
const ChartFallback = () => <Skeleton className="h-80 w-full rounded-xl" />;

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* 1. Title, month and meal session selector */}
      <DashboardHeader />

      {/* 2. Key numbers */}
      <DashboardStats />

      {/* 3. What needs attention now (not implemented yet)
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <TodaysMeals />
        </div>
        <div className="min-w-0">
          <PendingActions />
        </div>
      </section>
      */}

      {/* 4. Trends */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Remove "xl:col-span-2" when ExpenseTrendChart is added */}
        <div className="min-w-0 xl:col-span-2">
          <Suspense fallback={<ChartFallback />}>
            <MealTrendChart />
          </Suspense>
        </div>

        {/* <div className="min-w-0">
          <Suspense fallback={<ChartFallback />}>
            <ExpenseTrendChart />
          </Suspense>
        </div> */}
      </section>

      {/* 5. History (not implemented yet)
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <RecentExpenses />
        </div>
        <div className="min-w-0">
          <RecentActivity />
        </div>
      </section>
      */}
    </DashboardLayout>
  );
};