import { Button } from "@/shared/components/ui/Button";
import { useState } from "react";
import { AddMealReqModalByDate } from "../components/createReq/AddMealReqModalByDate";
import { MealRequestHistory } from "../components/history/MealRequestHistory";
import { MealRequestHistorySkeleton } from "../components/history/MealRequestHistorySkeleton";
import { useMyPendingMealReq } from "../hooks/useMyPendingMealRequests";

export const MealRequestSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useMyPendingMealReq();

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
          <Button className="h-fit" variant="success" onClick={() => setIsOpen(true)}>
            Create Request
          </Button>
        </div>
        <MealRequestHistory requests={requests} />
      </div>

      <AddMealReqModalByDate isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
};
