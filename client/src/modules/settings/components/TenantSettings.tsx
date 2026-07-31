import { Building2 } from "lucide-react";

import { TenantSwitcher } from "@/modules/tenant/components/TenantSwitcher";
import { ActionLink } from "@/shared/components/ui/ActionLink";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { SettingsCard } from "./SettingsCard";

export const TenantSettings = () => {
  const { can } = useRBAC();
  return (
    <SettingsCard
      title="Mess"
      description="Manage your mess and switch between available messes."
      icon={<Building2 size={22} />}
      actionLink={
        can(PERMISSIONS.TENANT_CREATE) && (
          <ActionLink to={`${ROUTES.TENANT}`}>
            Create new mess
          </ActionLink>
        )
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
        {/* Left */}

        <div>
          <h3 className="font-medium text-success">Current Mess</h3>

          <p className="mt-1 text-sm text-text">
            Select the mess you want to manage.
          </p>
        </div>

        {/* Right */}

        <TenantSwitcher />
      </div>
    </SettingsCard>
  );
};
