import { ROUTES } from "@/shared/constants/routes";
import { matchPath } from "react-router-dom";

interface GetCurrentBillPageConfigProps {
  pathname: string;
  onAddCurrentBill: () => void;
}

export const getCurrentBillPageConfig = ({
  pathname,
  onAddCurrentBill,
}: GetCurrentBillPageConfigProps) => {
  const pageConfig = {
    [ROUTES.CURRENT_BILL]: {
      title: "Current Bill Management",
      description: "Manage members' monthly current bills and payment records",
      actionText: "Current Bill",
      onAction: onAddCurrentBill,
    },

    [`${ROUTES.CURRENT_BILL}/deleted`]: {
      title: "Deleted Current Bills",
      description: "View and restore previously deleted current bills",
      actionText: "Current Bill",
      onAction: onAddCurrentBill,
    },

    [`${ROUTES.CURRENT_BILL}/history`]: {
      title: "Current Bill History",
      description: "View a member's current bill history",
      actionText: "Current Bill",
      onAction: onAddCurrentBill,
    },
  };

  const configKey = matchPath(
    `${ROUTES.CURRENT_BILL}/history/:userId`,
    pathname,
  )
    ? `${ROUTES.CURRENT_BILL}/history`
    : pathname;

  return (
    pageConfig[configKey as keyof typeof pageConfig] ??
    pageConfig[ROUTES.CURRENT_BILL]
  );
};
