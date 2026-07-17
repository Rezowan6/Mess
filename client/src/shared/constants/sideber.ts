import type { Permission } from "./permissions";
import { PERMISSIONS } from "./permissions";
import { ROUTES } from "./routes";

export interface ISidebarItem {
  title: string;
  path: string;
  icon?: string;

  permission?: Permission;
}

export const sidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
  },

  {
    title: "Users",
    path: ROUTES.USERS,
    permission: PERMISSIONS.USER_VIEW,
  },

  {
    title: "Meal Session",
    path: ROUTES.MEAL_SESSION,
    permission: PERMISSIONS.MEAL_SESSION_VIEW,
  },

  {
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    permission: PERMISSIONS.MEAL_ENTRY_VIEW,
  },

  {
    title: "Expense",
    path: ROUTES.EXPENSE,
    permission: PERMISSIONS.EXPENSE_VIEW,
  },

  {
    title: "Subscription",
    path: ROUTES.SUBSCRIPTION,
    permission: PERMISSIONS.SUBSCRIPTION_VIEW,
  },

  {
    title: "Payment",
    path: ROUTES.PAYMENT,
    permission: PERMISSIONS.SUBSCRIPTION_MANAGE,
  },

  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    permission: PERMISSIONS.SETTINGS_VIEW,
  },
];
