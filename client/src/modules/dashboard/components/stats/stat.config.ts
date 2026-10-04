import { PERMISSIONS, type Permission } from "@/shared/constants/permissions";
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
  amount: number;
  prefix: string;
  decimals: number;
  tone: "info" | "success" | "error" | "warning";
  path: string;
  permission: Permission;
}

// Half meals are possible, so show decimals only when needed
const getMealDecimals = (value: number) => (Number.isInteger(value) ? 0 : 2);

export const getDashboardStats = (stats: DashboardStats): DashboardStat[] => {
  const totalMeals = Number(stats.totalMeals);

  return [
    {
      key: "totalMeals",
      title: "Total Meals",
      amount: totalMeals,
      prefix: "",
      decimals: getMealDecimals(totalMeals),
      tone: "info",
      path: ROUTES.MEAL_ENTRY,
      permission: PERMISSIONS.MEAL_ENTRY_VIEW,
    },
    {
      key: "totalMembers",
      title: "Total Members",
      amount: Number(stats.totalMembers),
      prefix: "",
      decimals: 0,
      tone: "success",
      path: ROUTES.USERS,
      permission: PERMISSIONS.USER_VIEW,
    },
    {
      key: "totalExpense",
      title: "Total Expense",
      amount: Number(stats.totalExpense),
      prefix: "৳ ",
      decimals: 2,
      tone: "error",
      path: ROUTES.EXPENSE,
      permission: PERMISSIONS.EXPENSE_VIEW,
    },
    {
      key: "totalDeposit",
      title: "Total Deposit",
      amount: Number(stats.totalDeposit),
      prefix: "৳ ",
      decimals: 2,
      tone: "success",
      path: ROUTES.DEPOSIT,
      permission: PERMISSIONS.DEPOSIT_CREATE,
    },
  ];
};
