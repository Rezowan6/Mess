import { Building2 } from "lucide-react";

import { TenantSwitcher } from "@/modules/tenant/components/TenantSwitcher";
import { SettingsCard } from "./SettingsCard";

export const TenantSettings = () => {
  return (
    <SettingsCard
      title="Mess"
      description="Manage your mess and switch between available messes."
      icon={<Building2 size={22} />}
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
