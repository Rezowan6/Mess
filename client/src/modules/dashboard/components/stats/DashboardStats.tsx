import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { DASHBOARD_MESSAGES } from "./../../configs/dashboard.message";
import { DashboardStatCard } from "./DashboardStatCard";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { getDashboardStats } from "./stat.config";

// Full class names, so Tailwind can detect them
const XL_COLUMNS: Record<number, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
};

export const DashboardStats = () => {
  const { can } = useRBAC();
  const { data, isPending, isError, refetch } = useDashboardStats();

  if (isPending) {
    return <DashboardStatsSkeleton />;
  }

  // Show the error only when there is no cached data to display
  if (isError && !data) {
    return (
      <ErrorState
        title={DASHBOARD_MESSAGES.error.title}
        description={DASHBOARD_MESSAGES.error.description}
        onRetry={() => refetch()}
      />
    );
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
    <div
      className={`grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 ${
        XL_COLUMNS[visibleStats.length] ?? "xl:grid-cols-4"
      }`}
    >
      {visibleStats.map((stat) => (
        // A lone last card fills the full row on the 2-column layout
        <div
          key={stat.key}
          className="min-w-0 min-[380px]:max-xl:[&:last-child:nth-child(odd)]:col-span-2"
        >
          <DashboardStatCard stat={stat} />
        </div>
      ))}
    </div>
  );
};
