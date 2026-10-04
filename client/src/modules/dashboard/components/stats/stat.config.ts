import { PERMISSIONS, type Permission } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { getDecimals } from "@/shared/utils/number.utils";

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



export const getDashboardStats = (stats: DashboardStats): DashboardStat[] => {
  const totalMeals = Number(stats.totalMeals);

  return [
    {
      key: "totalMeals",
      title: "Meals",
      amount: totalMeals,
      prefix: "",
      decimals: getDecimals(totalMeals),
      tone: "info",
      path: ROUTES.MEAL_ENTRY,
      permission: PERMISSIONS.MEAL_ENTRY_VIEW,
    },
    {
      key: "totalMembers",
      title: "Members",
      amount: Number(stats.totalMembers),
      prefix: "",
      decimals: 0,
      tone: "success",
      path: ROUTES.USERS,
      permission: PERMISSIONS.USER_VIEW,
    },
    {
      key: "totalExpense",
      title: "Expenses",
      amount: Number(stats.totalExpense),
      prefix: "৳ ",
      decimals: 2,
      tone: "error",
      path: ROUTES.EXPENSE,
      permission: PERMISSIONS.EXPENSE_VIEW,
    },
    {
      key: "totalDeposit",
      title: "Deposits",
      amount: Number(stats.totalDeposit),
      prefix: "৳ ",
      decimals: 2,
      tone: "success",
      path: ROUTES.DEPOSIT,
      permission: PERMISSIONS.DEPOSIT_CREATE,
    },
  ];
};
