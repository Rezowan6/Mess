import { ActionLink } from "@/shared/components/ui/ActionLink";
import { BackButton } from "@/shared/components/ui/BackButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface GetDepositPageConfigProps {
  pathname: string;
}

export const getDepositPageConfig = ({
  pathname,
}: GetDepositPageConfigProps) => {
  const { can } = useRBAC();
  const pageConfig = {
    [ROUTES.DEPOSIT]: {
      title: "Deposit Management",
      description: "Manage member deposits and payment records",
      footer: can(PERMISSIONS.DEPOSIT_CREATE) && (
        <ActionLink to={`${ROUTES.DEPOSIT}/quick-add`}>Quick Add</ActionLink>
      ),
    },

    [`${ROUTES.DEPOSIT}/quick-add`]: {
      title: "Add Deposit",
      description: "Quickly add deposits for mess members.",
      footer: <BackButton />,
    },

    [`${ROUTES.DEPOSIT}/history`]: {
      title: "Deposit History",
      description: "View all deposits for this member.",
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.DEPOSIT]
  );
};
