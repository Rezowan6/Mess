import type { TableColumn } from "@/shared/components/ui/Table";

import { PlanRowActions } from "../components/PlanRowActions";
import { PlanStatusBadge } from "../components/PlanStatusBadge";
import type { IPlan } from "../types/plan.types";

export const usePlanColumns = (
  onEdit: (plan: IPlan) => void,
): TableColumn<IPlan>[] => {
  return [
    {
      key: "name",
      title: "Plan Name",
      render: (plan) => plan.name,
    },
    {
      key: "slug",
      title: "Slug",
      render: (plan) => plan.slug,
    },
    {
      key: "monthlyPrice",
      title: "Monthly Price",
      render: (plan) => `৳${plan.monthlyPrice}`,
    },
    {
      key: "yearlyPrice",
      title: "Yearly Price",
      hideOnMobile: true,
      render: (plan) => `৳${plan.yearlyPrice}`,
    },
    {
      key: "maxMembers",
      title: "Members",
      hideOnMobile: true,
      render: (plan) =>
        plan.maxMembers === -1 ? "Unlimited" : plan.maxMembers,
    },
    {
      key: "durationDays",
      title: "Duration",
      hideOnMobile: true,
      render: (plan) => `${plan.durationDays} Days`,
    },
    {
      key: "isActive",
      title: "Status",
      render: (plan) => <PlanStatusBadge isActive={plan.isActive} />,
    },
    {
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (plan) => <PlanRowActions plan={plan} onEdit={onEdit} />,
    },
  ];
};
