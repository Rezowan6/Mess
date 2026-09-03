import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { DashboardStatCard } from "./DashboardStatCard";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { getDashboardStats } from "./stat.config";

import { DASHBOARD_MESSAGES } from "./../../configs/dashboard.message";

export const DashboardStats = () => {
  const { data, isPending } = useDashboardStats();

  if (isPending) {
    return <DashboardStatsSkeleton />;
  }

  const stats = data?.data;

  if (!stats) {
    return (
      <EmptyState
        title={DASHBOARD_MESSAGES?.empty.title}
        description={DASHBOARD_MESSAGES?.empty.description}
      />
    );
  }

  const dashboardStats = getDashboardStats(stats);

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {dashboardStats.map(({ key, ...stat }) => (
        <DashboardStatCard key={key} {...stat} />
      ))}
    </div>
  );
};
