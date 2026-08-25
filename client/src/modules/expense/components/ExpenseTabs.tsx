import { RouteTabs } from "@/shared/components/ui/RouteTabs";
import { expenseTabs } from "../configs/expense.tabs.config";

export const ExpenseTabs = () => {
  return <RouteTabs tabs={expenseTabs} />;
};
