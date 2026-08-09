import { useState } from "react";

import { Table } from "@/shared/components/ui/Table";

import { usePlanFeatureColumns } from "../configs/planFeature.columns";
import { PLAN_FEATURE_MESSAGES } from "../configs/planFeature.messages";
import { usePlanFeatures } from "../hooks/usePlanFeatures";
import type { IPlanFeature } from "../types/planFeature.types";
import { PlanFeatureFormModal } from "./PlanFeatureFormModal";
import { PlanFeatureTableSkeleton } from "./PlanFeatureTableSkeleton";

export const PlanFeatureTable = () => {
  const [selectedPlanFeature, setSelectedPlanFeature] =
    useState<IPlanFeature | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isPending, isError, refetch } = usePlanFeatures();

  const planFeatures = data?.data ?? [];

  const handleEdit = (planFeature: IPlanFeature) => {
    setSelectedPlanFeature(planFeature);
    setIsEditOpen(true);
  };

  const columns = usePlanFeatureColumns(handleEdit);

  if (isPending) {
    return <PlanFeatureTableSkeleton />;
  }

  return (
    <>
      <Table
        columns={columns}
        data={planFeatures}
        loading={isPending}
        error={isError}
        message={PLAN_FEATURE_MESSAGES}
        refetch={refetch}
      />

      <PlanFeatureFormModal
        isOpen={isEditOpen}
        planFeature={selectedPlanFeature ?? undefined}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPlanFeature(null);
        }}
      />
    </>
  );
};
