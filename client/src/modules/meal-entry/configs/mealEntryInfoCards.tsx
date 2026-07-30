import { User, Utensils } from "lucide-react";

interface MealEntryInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getMealEntryInfoCards = (
  memberName: string,
  totalMeals: number,
): MealEntryInfoCardConfig[] => [
  {
    key: "member",
    title: "Member",
    value: memberName,
    icon: <User size={22} />,
    iconClassName: "text-primary",
  },
  {
    key: "totalMeals",
    title: "Total Meals",
    value: totalMeals,
    icon: <Utensils size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-xl font-bold text-success",
  },
];
