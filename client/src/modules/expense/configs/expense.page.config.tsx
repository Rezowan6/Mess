import { ROUTES } from "@/shared/constants/routes";
import { matchPath } from "react-router-dom";

interface GetExpensePageConfigProps {
  pathname: string;
  onAddExpense: () => void;
  onAddPartyExpense: () => void;
  onAddEggExpense: () => void;
  onAddRiceExpense: () => void;
}

export const getExpensePageConfig = ({
  pathname,
  onAddExpense,
  onAddPartyExpense,
  onAddEggExpense,
  onAddRiceExpense,
}: GetExpensePageConfigProps) => {
  const pageConfig = {
    [ROUTES.EXPENSE]: {
      title: "Expense Management",
      description: "Manage mess expenses and records",
      actionText: "Add Expense",
      onAction: onAddExpense,
    },

    [`${ROUTES.EXPENSE}/party`]: {
      title: "Party Expense",
      description: "Manage party expenses and participating members",
      actionText: "Add Party Expense",
      onAction: onAddPartyExpense,
    },

    [`${ROUTES.EXPENSE}/party/history`]: {
      title: "Party Expense History",
      description: "View party expense members and share details",
      actionText: "Add Party Expense",
      onAction: onAddPartyExpense,
    },
    [`${ROUTES.EXPENSE}/egg`]: {
      title: "Egg Management",
      description: "Manage member egg records and track egg consumption",
      actionText: "Add Egg",
      onAction: onAddEggExpense,
    },
    [`${ROUTES.EXPENSE}/egg/history`]: {
      title: "Egg History",
      description: "View member egg history and track egg consumption",
      actionText: "Add Egg",
      onAction: onAddEggExpense,
    },
    [`${ROUTES.EXPENSE}/rice`]: {
      title: "Rice Management",
      description: "Manage rice purchases and payment records",
      actionText: "Add Rice",
      onAction: onAddRiceExpense,
    },

    [`${ROUTES.EXPENSE}/rice/history`]: {
      title: "Rice Purchase Details",
      description:
        "View supplier information, payment progress and payment history",
      actionText: "Add Rice",
      onAction: onAddRiceExpense,
    },
  };
  const configKey = matchPath(`${ROUTES.EXPENSE}/rice/:riceId`, pathname)
    ? `${ROUTES.EXPENSE}/rice/history`
    : pathname;
  return (
    pageConfig[configKey as keyof typeof pageConfig] ??
    pageConfig[ROUTES.EXPENSE]
  );
};
