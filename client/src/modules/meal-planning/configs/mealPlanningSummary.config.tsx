import {
  CalendarCheck,
  Coffee,
  Moon,
  Sun,
  UtensilsCrossed,
} from "lucide-react";

export const mealPlanningSummaryCards = [
  {
    title: "Breakfast",
    key: "breakfast",
    icon: <Coffee />,
  },

  {
    title: "Lunch",
    key: "lunch",
    icon: <Sun />,
  },

  {
    title: "Dinner",
    key: "dinner",
    icon: <Moon />,
  },

  {
    title: "Guest Meal",
    key: "guestMeal",
    icon: <UtensilsCrossed />,
  },

  {
    title: "Total Meals",
    key: "totalMeals",
    icon: <CalendarCheck />,
  },
] as const;
