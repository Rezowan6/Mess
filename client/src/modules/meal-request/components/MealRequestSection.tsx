import { useMyPendingMealReq } from "../hooks/useMyPendingMealRequests";
import { MealRequestHistory } from "./history/MealRequestHistory";
import { MealRequestForm } from "./MealRequestForm";
import { MealRequestHeader } from "./MealRequestHeader";

export const MealRequestSection = () => {
  const { data, isPending } = useMyPendingMealReq();

  if (isPending) {
    return <span>Loading...</span>;
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
