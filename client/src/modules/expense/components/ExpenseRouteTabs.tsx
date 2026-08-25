import { RouteTabs } from "@/shared/components/ui/RouteTabs";
import { expenseTabs } from "../configs/expense.tabs.config";

export const ExpenseRouteTabs = () => {
  return <RouteTabs tabs={expenseTabs} />;
};
