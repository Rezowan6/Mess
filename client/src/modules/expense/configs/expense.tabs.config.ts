import { ROUTES } from "@/shared/constants/routes";

export const expenseTabs = [
  {
    key: "expense",
    label: "Expense",
    path: ROUTES.EXPENSE,
  },
  {
    key: "rice",
    label: "Rice",
    path: `${ROUTES.EXPENSE}/rice`,
  },
  {
    key: "party",
    label: "Party",
    path: `${ROUTES.EXPENSE}/party`,
  },
  {
    key: "egg",
    label: "Egg",
    path: `${ROUTES.EXPENSE}/egg`,
  },
] as const;
