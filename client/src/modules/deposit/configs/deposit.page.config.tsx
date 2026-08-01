import { BackButton } from "@/shared/components/ui/BackButton";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";

interface GetDepositPageConfigProps {
  pathname: string;
  onAddDeposit: () => void;
}

export const getDepositPageConfig = ({
  pathname,
  onAddDeposit,
}: GetDepositPageConfigProps) => {
  const pageConfig = {
    [ROUTES.DEPOSIT]: {
      title: "Deposit Management",
      description: "Manage member deposits and payment records",
      action: (
        <Button
          variant="success"
          permission={PERMISSIONS.DEPOSIT_CREATE}
          onClick={onAddDeposit}
        >
          Add Deposit
        </Button>
      ),
    },

    [`${ROUTES.DEPOSIT}/quick-add`]: {
      title: "Add Deposit",
      description: "Quickly add deposits for mess members.",
      action: <BackButton />,
    },

    [`${ROUTES.DEPOSIT}/history`]: {
      title: "Deposit History",
      description: "View all deposits for this member.",
      action: <BackButton />,
    },
  };

  

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.DEPOSIT]
  );
};
