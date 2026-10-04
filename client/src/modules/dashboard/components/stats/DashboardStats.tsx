import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { DASHBOARD_MESSAGES } from "./../../configs/dashboard.message";
import { DashboardStatCard } from "./DashboardStatCard";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { getDashboardStats } from "./stat.config";

export const DashboardStats = () => {
  const { can } = useRBAC();
  const { data, isPending } = useDashboardStats();

  if (isPending) {
    return <DashboardStatsSkeleton />;
  }

  const stats = data?.data;

  if (!stats) {
    return (
      <EmptyState
        title={DASHBOARD_MESSAGES.empty.title}
        description={DASHBOARD_MESSAGES.empty.description}
      />
    );
  }

  // Show only the cards the current user is allowed to see
  const visibleStats = getDashboardStats(stats).filter(({ permission }) =>
    can(permission),
  );

  if (visibleStats.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {visibleStats.map(({ key, permission: _permission, ...stat }) => (
        <DashboardStatCard key={key} {...stat} />
      ))}
    </div>
  );
};
