import { DashboardSessionBar } from "./DashboardSessionBar";
import { DashboardWelcome } from "./DashboardWelcome";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <DashboardWelcome />

      <DashboardSessionBar />
    </div>
  );
};
