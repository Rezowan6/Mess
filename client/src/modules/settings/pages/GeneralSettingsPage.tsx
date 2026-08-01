import { MealSessionSettings } from "@/modules/meal-session/components/MealSessionSettings";
import { MealSettings } from "@/modules/meal-setting/components/MealSettings";
import { TenantSettings } from "../components/TenantSettings";
import { ThemeSettings } from "../components/ThemeSettings";

export const GeneralSettingsPage = () => {
  return (
    <div className="space-y-6">
      <MealSettings />
      <MealSessionSettings />
      <TenantSettings />
      <ThemeSettings />
    </div>
  );
};
