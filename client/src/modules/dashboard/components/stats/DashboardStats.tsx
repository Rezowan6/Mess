import { DashboardStatCard } from "./DashboardStatCard";
import { dashboardStats } from "./stat.config";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <DashboardStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
