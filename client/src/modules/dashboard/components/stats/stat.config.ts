import {
  CreditCard,
  DollarSign,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/shared/constants/routes";

export interface DashboardStats {
  totalMeals: number;
  totalMembers: number;
  totalExpense: number;
  totalDeposit: number;
}

export interface DashboardStat {
  key: keyof DashboardStats;
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const getDashboardStats = (stats: DashboardStats): DashboardStat[] => [
  {
    key: "totalMeals",
    title: "Total Meals",
    value: stats.totalMeals,
    description: "This month",
    icon: Utensils,
    path: ROUTES.MEAL_ENTRY,
  },
  {
    key: "totalMembers",
    title: "Total Members",
    value: stats.totalMembers,
    description: "Active members",
    icon: Users,
    path: ROUTES.USERS,
  },
  {
    key: "totalExpense",
    title: "Total Expense",
    value: `৳ ${stats.totalExpense}`,
    description: "This month",
    icon: DollarSign,
    path: ROUTES.EXPENSE,
  },
  {
    key: "totalDeposit",
    title: "Total Deposit",
    value: `৳ ${stats.totalDeposit}`,
    description: "This month",
    icon: CreditCard,
    path: ROUTES.DEPOSIT,
  },
];
