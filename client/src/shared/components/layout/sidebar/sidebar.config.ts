import { PERMISSIONS, type Permission } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import type { LucideIcon } from "lucide-react";

import {
  Calculator,
  ClipboardList,
  Crown,
  Landmark,
  LayoutDashboard,
  Puzzle,
  Receipt,
  SlidersHorizontal,
  Users,
  Utensils,
} from "lucide-react";

export interface ISidebarItem {
  title: string;
  path: string;
  icon: LucideIcon;

  permission?: Permission;
}

export const sidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },

  {
    title: "Plans",
    path: ROUTES.PLANS,
    icon: Crown,
    // permission: PERMISSIONS.PLAN_VIEW,
  },

  {
    title: "Features",
    path: ROUTES.FEATURE,
    icon: Puzzle,
    // permission: PERMISSIONS.FEATURE_VIEW,
  },
  {
    title: "Plan Features",
    path: ROUTES.PLAN_FEATURE,
    icon: SlidersHorizontal,
    // permission: PERMISSIONS.PLAN_FEATURE_VIEW,
  },

  {
    title: "Users",
    path: ROUTES.USERS,
    icon: Users,
    permission: PERMISSIONS.USER_VIEW,
  },
  {
    title: "Meal Preference",
    path: ROUTES.PREFERENCE,
    icon: Utensils,
    permission: PERMISSIONS.MEAL_PREFERENCE_VIEW,
  },

  {
    title: "Meal Planning",
    path: ROUTES.MEAL_PLANNING,
    icon: ClipboardList,
    permission: PERMISSIONS.MEAL_PLANNING_VIEW,
  },

  {
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    icon: ClipboardList,
    permission: PERMISSIONS.MEAL_ENTRY_VIEW,
  },

  {
    title: "Expense",
    path: ROUTES.EXPENSE,
    icon: Receipt,
    permission: PERMISSIONS.EXPENSE_VIEW,
  },
  {
    title: "Deposit",
    path: ROUTES.DEPOSIT,
    icon: Landmark,
    permission: PERMISSIONS.DEPOSIT_VIEW,
  },
  {
    title: "Monthly Calculation",
    path: ROUTES.MONTHLY_CALCULATION,
    icon: Calculator,
    permission: PERMISSIONS.MONTHLY_CALCULATION_VIEW,
  },

  // {
  //   title: "Subscription",
  //   path: ROUTES.SUBSCRIPTION,
  //   icon: CreditCard,
  //   permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  // },

  // {
  //   title: "Payment",
  //   path: ROUTES.PAYMENT,
  //   icon: HandCoins,
  //   permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  // },
];
