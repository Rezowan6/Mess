import { MealRequestHistory } from "../components/history/MealRequestHistory";
import { MealRequestHistorySkeleton } from "../components/history/MealRequestHistorySkeleton";
import { useMyPendingMealReq } from "../hooks/useMyPendingMealRequests";

export const MealRequestSection = () => {
  const { data, isPending, } = useMyPendingMealReq();

  if (isPending) {
    return <MealRequestHistorySkeleton />;
  }

  const requests = data?.data ?? [];

  return (
    <section className="mt-6 rounded-xl shadow-sm">
      <div className="space-y-4">
        <div className="p-4 flex  justify-between">
          <div>
            <h2 className="text-lg font-semibold text-base-content">
              My Meal Requests
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              Your pending meal requests
            </p>
          </div>
        </div>
        <MealRequestHistory requests={requests} />
      </div>
    </section>
  );
};
