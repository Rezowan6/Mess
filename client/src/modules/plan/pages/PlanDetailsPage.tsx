import { useParams } from "react-router-dom";

import { PlanCard } from "../components/PlanCard";
import { usePlan } from "../hooks/usePlan";

export const PlanDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPending } = usePlan(Number(id));

  if (isPending) {
    return <div>Loading...</div>;
  }

  const plan = data?.data;

  if (!plan) {
    return <div>Plan not found.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PlanCard plan={plan} />
    </div>
  );
};
