import type { ReactNode } from "react";

import { BackButton } from "@/shared/components/ui/BackButton";
import { ROUTES } from "@/shared/constants/routes";

interface SettingsPageConfigProps {
  pathname: string;
}

interface SettingsPageConfig {
  title: string;
  description: string;
  action?: ReactNode;
  footer?: ReactNode;
}

export const getSettingsPageConfig = ({
  pathname,
}: SettingsPageConfigProps): SettingsPageConfig => {
  const pageConfig: Record<string, SettingsPageConfig> = {
    [ROUTES.SETTINGS]: {
      title: "Settings",
      description:
        "Manage your workspace, appearance and application preferences.",
    },

    [`${ROUTES.SETTINGS}/meal-setting`]: {
      title: "Meal Setting Management",
      description: "Manage meal rules, cutoff times and preferences.",

      footer: <BackButton />,
    },
  };

  return pageConfig[pathname] ?? pageConfig[ROUTES.SETTINGS];
};
