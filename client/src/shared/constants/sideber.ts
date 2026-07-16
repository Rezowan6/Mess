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
    roles: ["OWNER", "MANAGER"],
  },

  {
    title: "Meal Session",
    path: ROUTES.MEAL_SESSION,
    roles: ["OWNER", "MANAGER", "MEMBER"],
  },

  {
    title: "Meal Entry",
    path: ROUTES.MEAL_ENTRY,
    roles: ["OWNER", "MANAGER", "MEMBER"],
  },

  {
    title: "Expense",
    path: ROUTES.EXPENSE,
    roles: ["OWNER", "MANAGER"],
  },

  {
    title: "Subscription",
    path: ROUTES.SUBSCRIPTION,
    roles: ["OWNER"],
  },

  {
    title: "Payment",
    path: ROUTES.PAYMENT,
    roles: ["OWNER"],
  },

  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    roles: ["OWNER"],
  },
];
