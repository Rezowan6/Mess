import { BackButton } from "@/shared/components/ui/BackButton";
import { ROUTES } from "@/shared/constants/routes";

interface GetSubscriptionPageConfigProps {
  pathname: string;
  setIsOpen?: (value: boolean) => void;
}

export const getSubscriptionPageConfig = ({
  pathname,
  setIsOpen,
}: GetSubscriptionPageConfigProps) => {
  const pageConfig = {
    [ROUTES.SUBSCRIPTION]: {
      title: "Subscription Management",
      description: "Manage your current plan and subscription history.",
      action: undefined,
      footer: undefined,
    },

    [`${ROUTES.SUBSCRIPTION}/current`]: {
      title: "Current Subscription",
      description: "View your current active subscription and plan details.",
      action: undefined,
      footer: <BackButton />,
    },

    [`${ROUTES.SUBSCRIPTION}/history`]: {
      title: "Subscription History",
      description: "View your previous and current subscriptions.",
      action: undefined,
      footer: <BackButton />,
    },

    [`${ROUTES.SUBSCRIPTION}/:id`]: {
      title: "Subscription Details",
      description: "View detailed information about this subscription.",
      action: undefined,
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.SUBSCRIPTION]
  );
};
