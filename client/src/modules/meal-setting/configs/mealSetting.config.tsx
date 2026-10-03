import { Badge } from "@/shared/components/ui/Badge";
import { minutesToTime } from "@/shared/utils/time";

export const getMealSettingConfigs = (setting: any) => [
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
      // {
      //   label: "Guest Meal",
      //   value: (
      //     <Badge
      //       size="sm"
      //       variant={`${setting.allowGuestMeal ? "soft-success" : "soft-error"}`}
      //     >
      //       {setting.allowGuestMeal ? "Enabled" : "Disabled"}
      //     </Badge>
      //   ),
      // },
      {
        label: "Auto Approve",
        value: (
          <Badge
            size="sm"
            variant={`${setting.autoApproveMealRequest ? "soft-success" : "soft-error"}`}
          >
            {setting.autoApproveMealRequest ? "Enabled" : "Disabled"}
          </Badge>
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
