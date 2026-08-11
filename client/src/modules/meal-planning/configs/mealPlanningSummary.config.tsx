import {
  CalendarCheck,
  Coffee,
  Moon,
  Sun,
  UtensilsCrossed,
} from "lucide-react";

import { IconBox } from "@/shared/components/ui/IconBox";

export const mealPlanningSummaryCards = [
  {
    title: "Breakfast",
    key: "breakfast",
    icon: <IconBox className="bg-warning/10 text-warning" icon={<Coffee />} />,
  },

  {
    title: "Lunch",
    key: "lunch",
    icon: <IconBox className="bg-success/10 text-text" icon={<Sun />} />,
  },

  {
    title: "Dinner",
    key: "dinner",
    icon: <IconBox className="bg-info/10 text-info" icon={<Moon />} />,
  },

  {
    title: "Guest Meal",
    key: "guestMeal",
    icon: (
      <IconBox
        className="bg-secondary/10 text-secondary"
        icon={<UtensilsCrossed />}
      />
    ),
  },

  {
    title: "Total Meals",
    key: "totalMeals",
    icon: (
      <IconBox
        className="bg-primary/10 text-primary"
        icon={<CalendarCheck />}
      />
    ),
  },
] as const;
