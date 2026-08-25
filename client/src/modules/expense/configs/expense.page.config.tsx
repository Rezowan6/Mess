import { BackButton } from "@/shared/components/ui/BackButton";
import { ROUTES } from "@/shared/constants/routes";

interface GetExpensePageConfigProps {
  pathname: string;
  onAddExpense: () => void;
  onAddPartyExpense: () => void;
}

export const getExpensePageConfig = ({
  pathname,
  onAddExpense,
  onAddPartyExpense,
}: GetExpensePageConfigProps) => {
  const pageConfig = {
    [ROUTES.EXPENSE]: {
      title: "Expense Management",
      description: "Manage mess expenses and records",
      actionText: "Add Expense",
      onAction: onAddExpense,
      footer: <BackButton />,
    },

    [`${ROUTES.EXPENSE}/party`]: {
      title: "Party Expense",
      description: "Manage party expenses and participating members",
      actionText: "Add Party Expense",
      onAction: onAddPartyExpense,
      footer: <BackButton />,
    },

    [`${ROUTES.EXPENSE}/party/history`]: {
      title: "Party Expense History",
      description: "View party expense members and share details",
      actionText: "Add Party Expense",
      onAction: onAddPartyExpense,
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.EXPENSE]
  );
};
