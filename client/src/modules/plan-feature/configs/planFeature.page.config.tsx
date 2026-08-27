import { BackButton } from "@/shared/components/ui/BackButton";
import { ROUTES } from "@/shared/constants/routes";

interface GetPlanFeaturePageConfigProps {
  pathname: string;
  setIsOpen?: (value: boolean) => void;
}

export const getPlanFeaturePageConfig = ({
  pathname,
}: GetPlanFeaturePageConfigProps) => {
  const pageConfig = {
    [ROUTES.PLAN_FEATURE]: {
      title: "Plan Feature Management",
      description: "Manage features assigned to subscription plans.",
      action: undefined,
      footer: undefined,
    },

    [`${ROUTES.PLAN_FEATURE}/create`]: {
      title: "Add Plan Feature",
      description: "Assign a feature to a subscription plan.",
      action: undefined,
      footer: <BackButton />,
    },

    [`${ROUTES.PLAN_FEATURE}/:id`]: {
      title: "Plan Feature Details",
      description: "View and manage plan feature details.",
      action: undefined,
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.PLAN_FEATURE]
  );
};
