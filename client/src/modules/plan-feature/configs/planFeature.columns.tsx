import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { PlanFeatureRowActions } from "../components/PlanFeatureRowActions";
import type { IPlanFeature } from "../types/planFeature.types";

export const usePlanFeatureColumns = (
  onEdit: (planFeature: IPlanFeature) => void,
): TableColumn<IPlanFeature>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IPlanFeature>[] = [
    {
      key: "planId",
      title: "Plan ID",
      render: (planFeature) => planFeature.planId,
    },
    {
      key: "featureId",
      title: "Feature ID",
      render: (planFeature) => planFeature.featureId,
    },
    {
      key: "value",
      title: "Value",
      hideOnMobile: true,
      render: (planFeature) => planFeature.value || "No value",
    },
    {
      key: "createdAt",
      title: "Created At",
      hideOnMobile: true,
      render: (planFeature) =>
        new Date(planFeature.createdAt).toLocaleDateString(),
    },
  ];

  if (
    can(PERMISSIONS.PLAN_FEATURE_UPDATE) ||
    can(PERMISSIONS.PLAN_FEATURE_DELETE)
  ) {
    columns.push({
      key: "action",
      title: "Actions",
      className: "w-24",
      render: (planFeature) => (
        <PlanFeatureRowActions planFeature={planFeature} onEdit={onEdit} />
      ),
    });
  }

  return columns;
};
