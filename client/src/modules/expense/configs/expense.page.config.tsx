import { ActionLink } from "@/shared/components/ui/ActionLink";
import { BackButton } from "@/shared/components/ui/BackButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

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
  const { can } = useRBAC();

  const pageConfig = {
    [ROUTES.EXPENSE]: {
      title: "Expense Management",
      description: "Manage mess expenses and records",
      actionText: "Add Expense",
      onAction: onAddExpense,
      footer: can(PERMISSIONS.EXPENSE_CREATE) && (
        <ActionLink to={`${ROUTES.EXPENSE}/party`}>
          Add Party Expense
        </ActionLink>
      ),
    },

    [`${ROUTES.EXPENSE}/party`]: {
      title: "Party Expense",
      description: "Manage party expenses and participating members",
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
