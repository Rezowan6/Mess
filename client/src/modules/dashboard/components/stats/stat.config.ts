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
  icon: LucideIcon;
  path: string;
}

export const getDashboardStats = (stats: DashboardStats): DashboardStat[] => [
  {
    key: "totalMeals",
    title: "Total Meals",
    value: stats.totalMeals,
    icon: Utensils,
    path: ROUTES.MEAL_ENTRY,
  },
  {
    key: "totalMembers",
    title: "Total Members",
    value: stats.totalMembers,
    icon: Users,
    path: ROUTES.USERS,
  },
  {
    key: "totalExpense",
    title: "Total Expense",
    value: `৳ ${stats.totalExpense}`,
    icon: DollarSign,
    path: ROUTES.EXPENSE,
  },
  {
    key: "totalDeposit",
    title: "Total Deposit",
    value: `৳ ${stats.totalDeposit}`,
    icon: CreditCard,
    path: ROUTES.DEPOSIT,
  },
];
