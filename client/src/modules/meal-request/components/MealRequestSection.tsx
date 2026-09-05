import { useMyPendingMealReq } from "../hooks/useMyPendingMealRequests";
import { MealRequestHistory } from "./history/MealRequestHistory";
import { MealRequestHistorySkeleton } from "./MealRequestHistorySkeleton";

export const MealRequestSection = () => {
  const { data, isPending } = useMyPendingMealReq();

  if (isPending) {
    return <MealRequestHistorySkeleton />;
  }

  const requests = data?.data ?? [];

  return (
    <section className="mt-6 rounded-xl shadow-sm">
      <div className="space-y-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-base-content">
            My Meal Requests
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            Your pending meal requests
          </p>
        </div>
        <MealRequestHistory requests={requests} />
      </div>
    </section>
  );
};
