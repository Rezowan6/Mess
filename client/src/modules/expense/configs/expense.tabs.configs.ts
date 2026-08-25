import type { IExpenseType } from "../types/expense.types";

export const expenseTabs: { key: IExpenseType; label: string }[] = [
  { key: "party", label: "Party" },
  { key: "egg", label: "Egg" },
  { key: "rice", label: "Rice" },
] as const;
