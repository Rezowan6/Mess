import { minutesToTime } from "@/shared/utils/time";

export const getMealSettingConfigs = (setting: any) => [
  {
    title: "Default Meals",

    items: [
      {
        label: "Breakfast",
        value: setting.defaultBreakfastMeal,
      },
      {
        label: "Lunch",
        value: setting.defaultLunchMeal,
      },
      {
        label: "Dinner",
        value: setting.defaultDinnerMeal,
      },
    ],
  },

  {
    title: "Cutoff Times",

    items: [
      {
        label: "Breakfast",
        value: minutesToTime(setting.breakfastCutoffMinute),
      },
      {
        label: "Lunch",
        value: minutesToTime(setting.lunchCutoffMinute),
      },
      {
        label: "Dinner",
        value: minutesToTime(setting.dinnerCutoffMinute),
      },
    ],
  },

  {
    title: "Preferences",

    items: [
      {
        label: "Guest Meal",
        value: setting.allowGuestMeal ? "Allowed" : "Disabled",
      },
      {
        label: "Auto Approve",
        value: (
          <span className={`badge px-2 ${setting.autoApproveMealRequest ? "bg-gradient-success" : "bg-gradient-accent"}`}>
            {setting.autoApproveMealRequest ? "Enabled" : "Disabled"}
          </span>
        ),
      },
    ],
  },

  {
    title: "Timezone",

    items: [
      {
        label: "Timezone",
        value: setting.timezone,
      },
    ],
  },
];
