import { Users, UtensilsCrossed } from "lucide-react";

interface TodayMealEntryInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getTodayMealEntryInfoCards = (
  memberCount: number,
  summary: {
    breakfast: number;
    lunch: number;
    dinner: number;
    guest: number;
    totalMeal: number;
  },
): TodayMealEntryInfoCardConfig[] => [
  {
    key: "members",
    title: "Members",
    value: memberCount,
    icon: <Users size={22} />,
    iconClassName: "text-primary",
    valueClassName: "text-primary",
  },
  {
    key: "breakfast",
    title: "Breakfast",
    value: summary.breakfast,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-warning",
  },
  {
    key: "lunch",
    title: "Lunch",
    value: summary.lunch,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-success",
  },
  {
    key: "dinner",
    title: "Dinner",
    value: summary.dinner,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-error",
    valueClassName: "text-error",
  },
  {
    key: "guest",
    title: "Guest Meal",
    value: summary.guest,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-info",
    valueClassName: "text-info",
  },
  {
    key: "total",
    title: "Total Meal",
    value: summary.totalMeal,
    icon: <UtensilsCrossed size={22} />,
    iconClassName: "text-accent",
    valueClassName: "text-accent",
  },
];
