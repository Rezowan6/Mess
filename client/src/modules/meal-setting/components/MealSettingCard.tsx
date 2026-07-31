import { MealSettingItem } from "./MealSettingItem";

import type { IMealSetting } from "../types/mealSetting.types";

import { getMealSettingConfigs } from "../configs/mealSetting.config";

interface Props {
  setting: IMealSetting;
}

export const MealSettingCard = ({ setting }: Props) => {
  const configs = getMealSettingConfigs(setting);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {configs.map((config) => (
        <MealSettingItem
          key={config.title}
          title={config.title}
          items={config.items}
        />
      ))}
    </div>
  );
};
