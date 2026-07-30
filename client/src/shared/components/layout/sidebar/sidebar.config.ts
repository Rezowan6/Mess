import { PERMISSIONS, type Permission } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import type { LucideIcon } from "lucide-react";

import {
  ClipboardList,
  CreditCard,
  HandCoins,
  Landmark,
  LayoutDashboard,
  Receipt,
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
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    icon: ClipboardList,
    permission: PERMISSIONS.MEAL_ENTRY_CREATE,
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
    permission: PERMISSIONS.DEPOSIT_CREATE,
  },

  {
    title: "Subscription",
    path: ROUTES.SUBSCRIPTION,
    icon: CreditCard,
    permission: PERMISSIONS.SUBSCRIPTION_VIEW,
  },

  {
    title: "Payment",
    path: ROUTES.PAYMENT,
    icon: HandCoins,
    permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  },
];
