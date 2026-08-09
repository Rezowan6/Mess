import { IconBox } from "@/shared/components/ui/IconBox";
import { User, Utensils } from "lucide-react";

interface MealEntryInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
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
    icon: <IconBox size="sm" icon={<User />} />
  },
  {
    key: "totalMeals",
    title: "Total Meals",
    value: totalMeals,
    icon: <IconBox className="text-success" icon={<Utensils />}/>,
    valueClassName: "text-xl font-bold text-success",
  },
];
