import { Utensils } from "lucide-react";

import { SettingsCard } from "@/modules/settings/components/SettingsCard";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGate } from "@/shared/guards/PermissionGate";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useState } from "react";
import { getMealSettingConfigs } from "../configs/mealSetting.config";
import { useMealSetting } from "../hooks/useMealSetting";
import { MealSettingFormModal } from "./MealSettingFormModal";
import { MealSettingItem } from "./MealSettingItem";
import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useMealSetting();
  const { can } = useRBAC();

  const setting = data?.data ?? null;

  const configs = setting ? getMealSettingConfigs(setting) : [];

  return (
    <PermissionGate permission={PERMISSIONS.MEAL_SETTING_VIEW}>
      <SettingsCard
        title="Meal Settings"
        description="Configure meal rules, cutoff times and preferences."
        icon={<Utensils size={22} />}
        actionLink={
          can(PERMISSIONS.MEAL_SETTING_CREATE) && (
            <ActionLink to={`${ROUTES.SETTINGS}/meal-setting`}>
              Manage meal setting
            </ActionLink>
          )
        }
      >
        <div className="p-2">
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : setting ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {configs.map((config) => (
                  <MealSettingItem
                    key={config.title}
                    title={config.title}
                    items={config.items}
                  />
                ))}
              </div>
            </div>
          ) : (
            can(PERMISSIONS.MEAL_SETTING_CREATE) && (
              <div className="flex justify-center py-6">
                <Button
                  variant="success"
                  permission={PERMISSIONS.MEAL_SETTING_CREATE}
                  onClick={() => setIsOpen(true)}
                >
                  Create Meal Setting
                </Button>
              </div>
            )
          )}
        </div>
      </SettingsCard>

      <MealSettingFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGate>
  );
};
