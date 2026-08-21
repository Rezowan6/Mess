import { MealSettingManagePage } from "@/modules/meal-setting/pages/MealSettingManagePage";
import { ROUTES } from "@/shared/constants/routes";
import { GeneralSettingsPage } from "../pages/GeneralSettingsPage";
import { SettingsPage } from "../pages/SettingsPage";

export const settingRoutes = {
  path: ROUTES.SETTINGS,
  element: <SettingsPage />,
  children: [
    {
      index: true,
      element: <GeneralSettingsPage />,
    },
    {
      path: "meal-setting",
      element: <MealSettingManagePage />,
    },
  ],
};
