import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { usePlanColumns } from "../configs/planTable.config";
import { usePlans } from "../hooks/usePlans";
import type { IPlan } from "../types/plan.types";
import { PlanFormModal } from "./PlanFormModal";
import { PlanTableSkeleton } from "./PlanTableSkeleton";

export const PlanTable = () => {
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isPending } = usePlans();

  const plans = data?.data ?? [];

  const handleEdit = (plan: IPlan) => {
    setSelectedPlan(plan);
    setIsEditOpen(true);
  };

  const columns = usePlanColumns(handleEdit);

  if(isPending) {
    return <PlanTableSkeleton />
  }

  return (
    <>
      <Table columns={columns} data={plans} loading={isPending} />

      <PlanFormModal
        isOpen={isEditOpen}
        plan={selectedPlan ?? undefined}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPlan(null);
        }}
      />
    </>
  );
};
