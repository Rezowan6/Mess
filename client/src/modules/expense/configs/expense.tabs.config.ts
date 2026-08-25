import { ROUTES } from "@/shared/constants/routes";

export const expenseTabs = [
  {
    key: "expense",
    label: "Expense",
    path: ROUTES.EXPENSE,
  },
  {
    key: "party",
    label: "Party",
    path: `${ROUTES.EXPENSE}/party`,
  },
  {
    key: "rice",
    label: "Rice",
    path: `${ROUTES.EXPENSE}/rice`,
    disabled: true,
  },
  {
    key: "egg",
    label: "Egg",
    path: `${ROUTES.EXPENSE}/egg`,
    disabled: true,
  },
] as const;
