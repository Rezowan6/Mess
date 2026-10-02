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
  Settings,
  SlidersHorizontal,
  Users,
  Utensils,
} from "lucide-react";

export interface ISidebarItem {
  title: string;
  path: string;
  icon: LucideIcon;

  permission?: Permission;

  /**
   * Mobile bottom navigation
   *
   * primary -> show directly in bottom nav
   * more    -> show inside More menu
   */
  mobile?: "primary" | "more";

  desktop?: "primary" | "more";
}

export const sidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    permission: PERMISSIONS.USER_VIEW,
    mobile: "primary",
    desktop: "primary",
  },

  {
    title: "Plans",
    path: ROUTES.PLANS,
    icon: Crown,
    permission: PERMISSIONS.PLAN_VIEW,
    mobile: "more",
    desktop: "primary",
  },

  {
    title: "Features",
    path: ROUTES.FEATURE,
    icon: Puzzle,
    permission: PERMISSIONS.FEATURE_VIEW,
    mobile: "more",
    desktop: "primary",
  },

  {
    title: "Plan Features",
    path: ROUTES.PLAN_FEATURE,
    icon: SlidersHorizontal,
    permission: PERMISSIONS.PLAN_FEATURE_VIEW,
    mobile: "more",
    desktop: "primary",
  },

  {
    title: "Meal Request",
    path: ROUTES.PREFERENCE,
    icon: Utensils,
    permission: PERMISSIONS.MEAL_PREFERENCE_VIEW,
    mobile: "primary",
    desktop: "primary",
  },

  {
    title: "Expense",
    path: ROUTES.EXPENSE,
    icon: Receipt,
    permission: PERMISSIONS.EXPENSE_VIEW,
    mobile: "primary",
    desktop: "primary",
  },

  {
    title: "Meal Planning",
    path: ROUTES.MEAL_PLANNING,
    icon: ClipboardList,
    permission: PERMISSIONS.MEAL_PLANNING_VIEW,
    mobile: "primary",
    desktop: "primary",
  },

  {
    title: "Deposit",
    path: ROUTES.DEPOSIT,
    icon: Landmark,
    permission: PERMISSIONS.DEPOSIT_VIEW,
    mobile: "more",
    desktop: "primary",
  },
  {
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    icon: ClipboardList,
    permission: PERMISSIONS.MEAL_ENTRY_VIEW,
    mobile: "more",
    desktop: "more",
  },
  {
    title: "Members",
    path: ROUTES.USERS,
    icon: Users,
    permission: PERMISSIONS.USER_VIEW,
    mobile: "more",
    desktop: "more",
  },

  {
    title: "Monthly Calculation",
    path: ROUTES.MONTHLY_CALCULATION,
    icon: Calculator,
    permission: PERMISSIONS.MONTHLY_CALCULATION_VIEW,
    mobile: "more",
    desktop: "more",
  },

  // {
  //   title: "Subscription",
  //   path: ROUTES.SUBSCRIPTION,
  //   icon: CreditCard,
  //   permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  //   mobile: "more",
  //   desktop: "more",
  // },

  // {
  //   title: "Payment",
  //   path: ROUTES.PAYMENT,
  //   icon: HandCoins,
  //   permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  //   mobile: "more",
  //   desktop: "more",
  // },

  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    icon: Settings,
    permission: PERMISSIONS.SETTINGS_VIEW,
    mobile: "more",
    desktop: "more",
  },
];
