import { useDashboardStats } from "../../hooks/useDashboardStats";
import { DashboardStatCard } from "./DashboardStatCard";
import { getDashboardStats } from "./stat.config";

export const DashboardStats = () => {
  const { data, } = useDashboardStats();
  

  const stats = data?.data;

  if (!stats) return null;

  const dashboardStats = getDashboardStats(stats);

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {dashboardStats.map(({ key, ...stat }) => (
        <DashboardStatCard key={key} {...stat} />
      ))}
    </div>
  );
};
