import {
  CreditCard,
  DollarSign,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/shared/constants/routes";

export interface DashboardStat {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Meals",
    value: "142",
    description: "This month",
    icon: Utensils,
    path: ROUTES.MEAL_ENTRY,
  },
  {
    title: "Total Members",
    value: "18",
    description: "Active members",
    icon: Users,
    path: ROUTES.USERS,
  },
  {
    title: "Total Expense",
    value: "৳24,500",
    description: "This month",
    icon: DollarSign,
    path: ROUTES.EXPENSE,
  },
  {
    title: "Total Deposit",
    value: "৳30,000",
    description: "This month",
    icon: CreditCard,
    path: ROUTES.DEPOSIT,
  },
];