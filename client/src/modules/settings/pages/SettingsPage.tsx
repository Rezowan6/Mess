import { MealSessionSettings } from "@/modules/meal-session/components/MealSessionSettings";
import { TenantSettings } from "../components/TenantSettings";
import { ThemeSettings } from "../components/ThemeSettings";

export const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-base-content/60">
          Manage your workspace, appearance and application preferences.
        </p>
      </div>

      {/* Settings Sections */}

      <div className="space-y-6">
        <MealSessionSettings/>
        <TenantSettings />
        <ThemeSettings />
      </div>
    </div>
  );
};
