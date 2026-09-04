import { useMyPendingMealReq } from "../hooks/useMyPendingMealRequests";
import { MealRequestHistory } from "./history/MealRequestHistory";
import { MealRequestForm } from "./MealRequestForm";
import { MealRequestHeader } from "./MealRequestHeader";
import { MealRequestHistorySkeleton } from "./MealRequestHistorySkeleton";

export const MealRequestSection = () => {
  const { data, isPending } = useMyPendingMealReq();

  if (isPending) {
    return <MealRequestHistorySkeleton />;
  }

  const requests = data?.data ?? [];

  return (
    <section className="mt-6 rounded-xl shadow-sm">
      <MealRequestHeader />

      <div className="space-y-4">
        <MealRequestForm />

        <MealRequestHistory requests={requests} />
      </div>
    </section>
  );
};
