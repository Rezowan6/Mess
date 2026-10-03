import { matchPath } from "react-router-dom";

import { ActionLink } from "@/shared/components/ui/ActionLink";
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
      showAddButton: true,
      footer: can(PERMISSIONS.DEPOSIT_CREATE) && (
        <ActionLink to={`${ROUTES.DEPOSIT}/quick-add`}>Quick Add</ActionLink>
      ),
    },

    [`${ROUTES.DEPOSIT}/quick-add`]: {
      title: "Add Deposit",
      description: "Quickly add deposits for mess members.",
      showAddButton: false,
    },

    [`${ROUTES.DEPOSIT}/history`]: {
      title: "Deposit History",
      description: "View all deposits for this member.",
      showAddButton: false,
    },
  };

  // /deposit/history/:memberId uses the same config as the history page
  const configKey = matchPath(`${ROUTES.DEPOSIT}/history/:memberId`, pathname)
    ? `${ROUTES.DEPOSIT}/history`
    : pathname;

  return (
    pageConfig[configKey as keyof typeof pageConfig] ??
    pageConfig[ROUTES.DEPOSIT]
  );
};
