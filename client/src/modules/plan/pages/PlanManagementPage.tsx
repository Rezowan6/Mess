import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useState } from "react";
import { PlanFormModal } from "../components/PlanFormModal";
import { PlanTable } from "../components/PlanTable";

export const PlanManagementPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ManagementPage
      title="Plan Management"
      description="Manage subscription plans, pricing, member limits, and plan status. "
      action={
        <Button
          variant="moduleBtn"
          onClick={() => setIsOpen(true)}
          permission={PERMISSIONS.PLANS_CREATE}
        >
          Add Plan
        </Button>
      }
    >
      <PlanTable />
      <PlanFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ManagementPage>
  );
};
