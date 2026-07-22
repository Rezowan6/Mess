import { Palette } from "lucide-react";

import { ThemeSwitcher } from "@/shared/components/ui/ThemeSwitcher";

import { SettingsCard } from "./SettingsCard";

export const ThemeSettings = () => {
  return (
    <SettingsCard
      title="Appearance"
      description="Customize the appearance of your application."
      icon={<Palette size={22} />}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
        {/* Left */}

        <div>
          <h3 className="font-medium text-success">Theme</h3>

          <p className="mt-1 text-sm text-text">
            Choose between light, dark and system mode.
          </p>
        </div>

        {/* Right */}

        <ThemeSwitcher />
      </div>
    </SettingsCard>
  );
};
