import { ROUTES } from "./routes";

export interface SidebarItem {
  title: string;

  path: string;

  icon?: string;

  roles?: string[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
  },

  {
    title: "Users",
    path: ROUTES.USERS,
    roles: ["admin", "manager"],
  },

  {
    title: "Meal Session",
    path: ROUTES.MEAL_SESSION,
    roles: ["admin", "manager", "member"],
  },

  {
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    roles: ["admin", "manager", "member"],
  },

  {
    title: "Expense",
    path: ROUTES.EXPENSE,
    roles: ["admin", "manager"],
  },

  {
    title: "Subscription",
    path: ROUTES.SUBSCRIPTION,
    roles: ["admin"],
  },

  {
    title: "Payment",
    path: ROUTES.PAYMENT,
    roles: ["admin"],
  },

  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    roles: ["admin"],
  },
];
