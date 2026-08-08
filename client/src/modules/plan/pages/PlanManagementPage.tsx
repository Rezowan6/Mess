import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { BackButton } from "@/shared/components/ui/BackButton";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PlanFormModal } from "../components/PlanFormModal";

export const PlanManagementPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
        footer={<BackButton />}
      >
        <Outlet />
      </ManagementPage>
      <PlanFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
