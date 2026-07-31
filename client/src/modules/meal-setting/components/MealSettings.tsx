import { Utensils } from "lucide-react";

import { SettingsCard } from "@/modules/settings/components/SettingsCard";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGate } from "@/shared/guards/PermissionGate";
import { getMealSettingConfigs } from "../configs/mealSetting.config";
import { useMealSetting } from "../hooks/useMealSetting";
import { MealSettingItem } from "./MealSettingItem";
import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";

export const MealSettings = () => {
  const { data, isLoading } = useMealSetting();

  const setting = data?.data ?? [];

  const configs = setting ? getMealSettingConfigs(setting) : [];

  return (
    <PermissionGate permission={PERMISSIONS.MEAL_SETTING_VIEW}>
      <SettingsCard
        title="Meal Settings"
        description="Configure meal rules, cutoff times and preferences."
        icon={<Utensils size={22} />}
        actionLink={<ActionLink to={`${ROUTES.SETTINGS}/meal-setting`}>Manage meal setting</ActionLink>}
      >
        
        <div className="p-2">
          {isLoading ? (
            <p>Loading...</p>
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
            <p>No meal setting configured.</p>
          )}
        </div>
      </SettingsCard>
    </PermissionGate>
  );
};
